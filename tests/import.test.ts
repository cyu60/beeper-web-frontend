import { describe, test, expect } from 'vitest'
import { parseContactsCsv, slugify, normalizePhone, type ContactRow } from '@/lib/import'

describe('parseContactsCsv', () => {
  test('parses a simple header + rows CSV', () => {
    const csv = 'name,phone,email\nAlice Doe,+14155550111,alice@x.com\nBob Smith,4155550222,bob@y.com\n'
    const rows = parseContactsCsv(csv)
    expect(rows).toHaveLength(2)
    expect(rows[0]).toMatchObject({ display_name: 'Alice Doe', phone: '+14155550111' })
    expect(rows[1]).toMatchObject({ display_name: 'Bob Smith', phone: '+14155550222' })
  })

  test('accepts header column aliases (Name, PHONE, Email)', () => {
    const csv = 'Name,PHONE,Email\nA,+1,a@x\n'
    const rows = parseContactsCsv(csv)
    expect(rows[0].display_name).toBe('A')
    expect(rows[0].phone).toBe('+1')
  })

  test('accepts "mobile" as a phone column synonym', () => {
    const csv = 'name,mobile\nAlice,4155550111\n'
    const rows = parseContactsCsv(csv)
    expect(rows[0].phone).toBe('+14155550111')
  })

  test('skips rows without a name', () => {
    const csv = 'name,phone\n,+1\nValid,+2\n'
    const rows = parseContactsCsv(csv)
    expect(rows).toHaveLength(1)
    expect(rows[0].display_name).toBe('Valid')
  })

  test('skips rows without a phone (E.164 required for SMS wake)', () => {
    const csv = 'name,phone\nNoPhone,\nValid,+15555550001\n'
    const rows = parseContactsCsv(csv)
    expect(rows.map(r => r.display_name)).toEqual(['Valid'])
  })

  test('auto-slugs id from first name lowercase', () => {
    const csv = 'name,phone\nAlice Wonderland,+15555550001\n'
    const rows = parseContactsCsv(csv)
    expect(rows[0].id).toBe('alice')
  })

  test('handles quoted fields with commas inside', () => {
    const csv = 'name,phone\n"Doe, Alice",+15555550001\n'
    const rows = parseContactsCsv(csv)
    expect(rows[0].display_name).toBe('Doe, Alice')
    expect(rows[0].id).toBe('doe')
  })

  test('returns empty array on empty or whitespace input', () => {
    expect(parseContactsCsv('')).toEqual([])
    expect(parseContactsCsv('   \n\n')).toEqual([])
  })
})

describe('slugify', () => {
  test('lowercases the first whitespace-delimited token', () => {
    expect(slugify('Alice Wonderland')).toBe('alice')
    expect(slugify('jeffrey')).toBe('jeffrey')
  })

  test('strips non-ascii chars from the slug', () => {
    expect(slugify('Chinαt Yu')).toBe('chint')
  })

  test('returns empty string on empty input', () => {
    expect(slugify('')).toBe('')
    expect(slugify('   ')).toBe('')
  })
})

describe('normalizePhone', () => {
  test('keeps an E.164 number as-is', () => {
    expect(normalizePhone('+14155550111')).toBe('+14155550111')
  })

  test('prepends +1 to a 10-digit US number', () => {
    expect(normalizePhone('4155550111')).toBe('+14155550111')
    expect(normalizePhone('(415) 555-0111')).toBe('+14155550111')
  })

  test('prepends + to an 11-digit number starting with 1', () => {
    expect(normalizePhone('14155550111')).toBe('+14155550111')
  })

  test('returns empty string for an empty or all-non-digit input', () => {
    expect(normalizePhone('')).toBe('')
    expect(normalizePhone('—')).toBe('')
  })
})

import { parseContactsVCard } from '@/lib/import'

describe('parseContactsVCard', () => {
  test('parses a single vCard 3.0 entry', () => {
    const v = `BEGIN:VCARD\r\nVERSION:3.0\r\nFN:Alice Doe\r\nN:Doe;Alice;;;\r\nTEL;TYPE=CELL:+14155550111\r\nEND:VCARD\r\n`
    const rows = parseContactsVCard(v)
    expect(rows).toHaveLength(1)
    expect(rows[0]).toMatchObject({ display_name: 'Alice Doe', phone: '+14155550111', id: 'alice' })
  })

  test('parses multi-entry vCard file (Mac Contacts.app bulk export)', () => {
    const v = [
      'BEGIN:VCARD\r\nVERSION:3.0\r\nFN:Alice Doe\r\nTEL:+14155550111\r\nEND:VCARD\r\n',
      'BEGIN:VCARD\r\nVERSION:3.0\r\nFN:Bob Smith\r\nTEL:+14155550222\r\nEND:VCARD\r\n',
    ].join('')
    const rows = parseContactsVCard(v)
    expect(rows.map(r => r.id)).toEqual(['alice', 'bob'])
  })

  test('accepts LF-only line endings as well as CRLF', () => {
    const v = 'BEGIN:VCARD\nVERSION:3.0\nFN:Carol\nTEL:+14155550333\nEND:VCARD\n'
    const rows = parseContactsVCard(v)
    expect(rows[0]?.display_name).toBe('Carol')
  })

  test('handles unfolded lines per RFC 6350 (leading space continuation)', () => {
    const v = 'BEGIN:VCARD\r\nVERSION:3.0\r\nFN:Alice\r\n Doe\r\nTEL:+1\r\nEND:VCARD\r\n'
    const rows = parseContactsVCard(v)
    expect(rows[0]?.display_name).toBe('AliceDoe')
  })

  test('extracts phone from TEL with parameters (TYPE=CELL,VOICE etc.)', () => {
    const v = 'BEGIN:VCARD\r\nVERSION:3.0\r\nFN:X\r\nTEL;TYPE=CELL,VOICE;PREF=1:+14155550444\r\nEND:VCARD\r\n'
    const rows = parseContactsVCard(v)
    expect(rows[0]?.phone).toBe('+14155550444')
  })

  test('picks the CELL/MOBILE phone over HOME/WORK when multiple exist', () => {
    const v = 'BEGIN:VCARD\r\nVERSION:3.0\r\nFN:X\r\nTEL;TYPE=HOME:+19990000000\r\nTEL;TYPE=CELL:+14155550000\r\nEND:VCARD\r\n'
    const rows = parseContactsVCard(v)
    expect(rows[0]?.phone).toBe('+14155550000')
  })

  test('falls back to first TEL when no CELL/MOBILE present', () => {
    const v = 'BEGIN:VCARD\r\nVERSION:3.0\r\nFN:X\r\nTEL;TYPE=WORK:+18887776666\r\nEND:VCARD\r\n'
    const rows = parseContactsVCard(v)
    expect(rows[0]?.phone).toBe('+18887776666')
  })

  test('skips entries without a phone', () => {
    const v = 'BEGIN:VCARD\r\nVERSION:3.0\r\nFN:NoPhone\r\nEMAIL:a@b\r\nEND:VCARD\r\n'
    const rows = parseContactsVCard(v)
    expect(rows).toEqual([])
  })

  test('skips entries without a name', () => {
    const v = 'BEGIN:VCARD\r\nVERSION:3.0\r\nTEL:+1\r\nEND:VCARD\r\n'
    const rows = parseContactsVCard(v)
    expect(rows).toEqual([])
  })

  test('unescapes vCard backslash escapes in FN', () => {
    const v = 'BEGIN:VCARD\r\nVERSION:3.0\r\nFN:Doe\\, Alice\r\nTEL:+1\r\nEND:VCARD\r\n'
    const rows = parseContactsVCard(v)
    expect(rows[0]?.display_name).toBe('Doe, Alice')
  })

  test('returns empty array on input that has no BEGIN:VCARD blocks', () => {
    expect(parseContactsVCard('not a vcard')).toEqual([])
    expect(parseContactsVCard('')).toEqual([])
  })
})
