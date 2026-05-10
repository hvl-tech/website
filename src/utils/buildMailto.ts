export function buildMailto(opts: { to: string; subject: string; body: string }): string {
    const params = new URLSearchParams({ subject: opts.subject, body: opts.body });
    const qs = params.toString().replace(/\+/g, '%20');
    return `mailto:${opts.to}?${qs}`;
}
