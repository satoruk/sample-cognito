
export async function readText(): Promise<string> {
  process.stdin.resume()
  let data = await new Promise(r => process.stdin.once('data', r))
      .finally(() => process.stdin.pause())
  return String(data).toString().trim();
}