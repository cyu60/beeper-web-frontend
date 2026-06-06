// src/lib/import.ts
// Pure helpers for parsing pasted-CSV / Apple-Contacts-VCard-export-as-CSV into
// the shape the /api/admin/contacts/import endpoint expects.

export type ContactRow = {
  id: string
  display_name: string
  phone: string
}

const NAME_KEYS = ['name', 'display_name', 'full name', 'fullname']
const PHONE_KEYS = ['phone', 'sms', 'mobile', 'cell', 'phone number']

export function slugify(name: string): string {
  const first = name.trim().split(/\s+/)[0] ?? ''
  return first.toLowerCase().replace(/[^a-z0-9_-]/g, '')
}

export function normalizePhone(raw: string): string {
  if (!raw) return ''
  const digits = raw.replace(/\D/g, '')
  if (!digits) return ''
  if (raw.trim().startsWith('+')) return '+' + digits
  if (digits.length === 10) return '+1' + digits
  if (digits.length === 11 && digits.startsWith('1')) return '+' + digits
  return '+' + digits
}

function parseRow(line: string): string[] {
  const out: string[] = []
  let buf = ''
  let inQuotes = false
  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (inQuotes) {
      if (ch === '"' && line[i + 1] === '"') { buf += '"'; i++; continue }
      if (ch === '"') { inQuotes = false; continue }
      buf += ch
      continue
    }
    if (ch === '"') { inQuotes = true; continue }
    if (ch === ',') { out.push(buf); buf = ''; continue }
    buf += ch
  }
  out.push(buf)
  return out.map(s => s.trim())
}

// ---------------------------------------------------------------------------
// vCard 3.0 parsing — supports the multi-entry export from macOS Contacts.app
// (File → Export → "Export vCard…") and single-entry shares from iOS Contacts.
// ---------------------------------------------------------------------------

function unfoldVCardLines(raw: string): string[] {
  // RFC 6350: lines beginning with a single SP or HTAB are continuations of
  // the previous line. Concatenate them, then strip empty lines.
  const lines = raw.split(/\r?\n/)
  const out: string[] = []
  for (const line of lines) {
    if ((line.startsWith(' ') || line.startsWith('\t')) && out.length > 0) {
      out[out.length - 1] += line.slice(1)
    } else {
      out.push(line)
    }
  }
  return out
}

function unescapeVCardField(s: string): string {
  return s.replace(/\\,/g, ',').replace(/\\;/g, ';').replace(/\\n/gi, '\n').replace(/\\\\/g, '\\')
}

function parsePropertyLine(line: string): { name: string; params: Record<string, string>; value: string } | null {
  const colonIdx = line.indexOf(':')
  if (colonIdx < 0) return null
  const head = line.slice(0, colonIdx)
  const value = line.slice(colonIdx + 1)
  const parts = head.split(';')
  const name = parts[0].toUpperCase()
  const params: Record<string, string> = {}
  for (let i = 1; i < parts.length; i++) {
    const [k, v] = parts[i].split('=')
    if (k && v) params[k.toUpperCase()] = v.toUpperCase()
  }
  return { name, params, value }
}

function pickPreferredTel(tels: { params: Record<string, string>; value: string }[]): string | null {
  if (tels.length === 0) return null
  const mobile = tels.find(t => /CELL|MOBILE/.test(t.params.TYPE ?? ''))
  return (mobile ?? tels[0]).value
}

export function parseContactsVCard(input: string): ContactRow[] {
  if (!input.includes('BEGIN:VCARD')) return []
  const lines = unfoldVCardLines(input)
  const out: ContactRow[] = []
  let fn: string | null = null
  let tels: { params: Record<string, string>; value: string }[] = []

  const finishBlock = () => {
    const name = fn ? unescapeVCardField(fn).trim() : ''
    const rawPhone = pickPreferredTel(tels) ?? ''
    const phone = normalizePhone(rawPhone)
    if (name && phone) {
      const id = slugify(name)
      if (id) out.push({ id, display_name: name, phone })
    }
    fn = null
    tels = []
  }

  for (const rawLine of lines) {
    const line = rawLine.trim()
    if (!line) continue
    if (line.toUpperCase().startsWith('BEGIN:VCARD')) {
      fn = null
      tels = []
      continue
    }
    if (line.toUpperCase().startsWith('END:VCARD')) {
      finishBlock()
      continue
    }
    const prop = parsePropertyLine(line)
    if (!prop) continue
    if (prop.name === 'FN') {
      fn = prop.value
    } else if (prop.name === 'TEL') {
      tels.push({ params: prop.params, value: prop.value })
    }
  }
  return out
}

export function parseContactsCsv(csv: string): ContactRow[] {
  const lines = csv.split(/\r?\n/).map(l => l.trim()).filter(Boolean)
  if (lines.length === 0) return []
  const headers = parseRow(lines[0]).map(h => h.toLowerCase())
  const nameIdx = headers.findIndex(h => NAME_KEYS.includes(h))
  const phoneIdx = headers.findIndex(h => PHONE_KEYS.includes(h))
  if (nameIdx < 0 || phoneIdx < 0) return []
  const out: ContactRow[] = []
  for (let i = 1; i < lines.length; i++) {
    const cells = parseRow(lines[i])
    const name = (cells[nameIdx] ?? '').trim()
    const phone = normalizePhone(cells[phoneIdx] ?? '')
    if (!name || !phone) continue
    const id = slugify(name)
    if (!id) continue
    out.push({ id, display_name: name, phone })
  }
  return out
}
