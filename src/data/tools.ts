export interface ToolFaq { q: string; a: string }
export interface ToolExample { title: string; input?: string; output?: string; note?: string }
export interface Tool {
  slug: string; name: string; category: string; description: string;
  seoTitle: string; metaDescription: string; intro: string;
  howTo: string[]; examples: ToolExample[]; faqs: ToolFaq[];
  related: string[]; component: string; mode?: string; implemented: boolean; popular?: boolean;
}
export const tools: Tool[] = [
  {
    slug: 'edpi-calculator',
    name: 'eDPI Calculator',
    category: 'FPS',
    description: 'Calculate your effective DPI (eDPI) from mouse DPI and in-game sensitivity.',
    seoTitle: 'eDPI Calculator - Effective DPI for FPS Games | LootKit',
    metaDescription: 'Free eDPI calculator. Multiply your mouse DPI by in-game sensitivity to get your effective DPI and compare sensitivities across setups.',
    intro: 'eDPI (effective DPI) is your mouse DPI multiplied by your in-game sensitivity - the number that lets you compare aim speed across different setups.',
    howTo: ['Enter your mouse DPI (from your mouse software).', 'Enter your in-game sensitivity.', 'Your eDPI appears instantly.'],
    examples: [{ title: 'Common Valorant setup', input: '800 DPI, 0.4 sens', output: 'eDPI = 320' }],
    faqs: [
      { q: 'What is a good eDPI?', a: 'It depends on the game. Tactical FPS players often land between 200-400 eDPI at 800 DPI, while faster games skew higher. Use eDPI to match a pro or a friend, then adjust by feel.' },
      { q: 'Is eDPI the same across games?', a: 'No. Each game scales sensitivity differently, so eDPI is only comparable within the same game.' }
    ],
    related: [],
    component: 'EdpiTool',
    implemented: true,
    popular: true
  }
];
export const implementedTools = tools.filter((t) => t.implemented);
export const categories = [...new Set(tools.map((t) => t.category))];
export function bySlug(slug: string) { return tools.find((t) => t.slug === slug); }
