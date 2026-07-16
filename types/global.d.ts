// Declare CSS modules so TypeScript doesn't complain about CSS imports
// (same convention as apps/frontend/types/global.d.ts).
declare module '*.css' {
  const content: Record<string, string>;
  export default content;
}
