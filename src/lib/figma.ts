/**
 * Figma API Client
 * 
 * Sử dụng Figma MCP hoặc Personal Access Token để fetch design data
 */

const FIGMA_ACCESS_TOKEN = process.env.FIGMA_ACCESS_TOKEN;
const FIGMA_API_BASE = 'https://api.figma.com/v1';

export interface FigmaFile {
  name: string;
  lastModified: string;
  thumbnailUrl: string;
  version: string;
  document: FigmaNode;
  styles: Record<string, FigmaStyle>;
  schemaVersion: number;
}

export interface FigmaNode {
  id: string;
  name: string;
  type: string;
  children?: FigmaNode[];
  absoluteBoundingBox?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  style?: FigmaTextStyle;
  fills?: FigmaPaint[];
  strokes?: FigmaPaint[];
  effects?: FigmaEffect[];
}

export interface FigmaTextStyle {
  fontFamily: string;
  fontWeight: number;
  fontSize: number;
  lineHeightPx: number;
  letterSpacing: number;
  textAlignHorizontal: 'LEFT' | 'CENTER' | 'RIGHT';
}

export interface FigmaPaint {
  type: 'SOLID' | 'GRADIENT_LINEAR' | 'GRADIENT_RADIAL' | 'IMAGE';
  color?: {
    r: number;
    g: number;
    b: number;
    a: number;
  };
  opacity?: number;
}

export interface FigmaEffect {
  type: 'DROP_SHADOW' | 'INNER_SHADOW' | 'LAYER_BLUR' | 'BACKGROUND_BLUR';
  visible: boolean;
  radius: number;
  color?: {
    r: number;
    g: number;
    b: number;
    a: number;
  };
}

export interface FigmaStyle {
  key: string;
  name: string;
  styleType: 'FILL' | 'TEXT' | 'EFFECT' | 'GRID';
}

/**
 * Fetch Figma file data
 */
export async function getFigmaFile(fileKey: string): Promise<FigmaFile> {
  const response = await fetch(`${FIGMA_API_BASE}/files/${fileKey}`, {
    headers: {
      'X-Figma-Token': FIGMA_ACCESS_TOKEN || '',
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Figma API Error: ${error.message || response.statusText}`);
  }

  return response.json();
}

/**
 * Get specific nodes from Figma file
 */
export async function getFigmaNodes(
  fileKey: string,
  nodeIds: string[]
): Promise<Record<string, FigmaNode>> {
  const ids = nodeIds.join(',');
  const response = await fetch(
    `${FIGMA_API_BASE}/files/${fileKey}/nodes?ids=${ids}`,
    {
      headers: {
        'X-Figma-Token': FIGMA_ACCESS_TOKEN || '',
      },
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Figma API Error: ${error.message || response.statusText}`);
  }

  return response.json();
}

/**
 * Get image URLs from Figma
 */
export async function getFigmaImages(
  fileKey: string,
  nodeIds: string[],
  format: 'PNG' | 'JPG' | 'SVG' = 'PNG'
): Promise<{ images: Record<string, string> }> {
  const ids = nodeIds.join(',');
  const response = await fetch(
    `${FIGMA_API_BASE}/images/${fileKey}?ids=${ids}&format=${format}`,
    {
      headers: {
        'X-Figma-Token': FIGMA_ACCESS_TOKEN || '',
      },
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Figma API Error: ${error.message || response.statusText}`);
  }

  return response.json();
}

/**
 * Extract frames from Figma file
 */
export function extractFrames(node: FigmaNode): FigmaNode[] {
  const frames: FigmaNode[] = [];

  function traverse(n: FigmaNode) {
    if (n.type === 'FRAME' || n.type === 'COMPONENT' || n.type === 'INSTANCE') {
      frames.push(n);
    }
    if (n.children) {
      n.children.forEach(traverse);
    }
  }

  traverse(node);
  return frames;
}

/**
 * Convert Figma color to CSS
 */
export function figmaColorToCSS(color: { r: number; g: number; b: number; a?: number }): string {
  const r = Math.round(color.r * 255);
  const g = Math.round(color.g * 255);
  const b = Math.round(color.b * 255);
  const a = color.a !== undefined ? color.a : 1;

  if (a === 1) {
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }

  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

/**
 * Convert Figma style to Tailwind classes
 */
export function figmaStyleToTailwind(
  style: FigmaTextStyle,
  fills?: FigmaPaint[]
): string {
  const classes: string[] = [];

  // Font family
  if (style.fontFamily) {
    classes.push(`font-${style.fontFamily.toLowerCase().replace(/\s+/g, '-')}`);
  }

  // Font weight
  const fontWeightMap: Record<number, string> = {
    100: 'thin',
    200: 'extralight',
    300: 'light',
    400: 'normal',
    500: 'medium',
    600: 'semibold',
    700: 'bold',
    800: 'extrabold',
    900: 'black',
  };
  if (style.fontWeight) {
    classes.push(`font-${fontWeightMap[style.fontWeight] || 'normal'}`);
  }

  // Font size
  if (style.fontSize) {
    // Map common font sizes to Tailwind classes
    const sizeMap: Record<number, string> = {
      12: 'text-xs',
      14: 'text-sm',
      16: 'text-base',
      18: 'text-lg',
      20: 'text-xl',
      24: 'text-2xl',
      30: 'text-3xl',
      36: 'text-4xl',
      48: 'text-5xl',
    };
    classes.push(sizeMap[style.fontSize] || `text-[${style.fontSize}px]`);
  }

  // Text align
  if (style.textAlignHorizontal) {
    const alignMap: Record<string, string> = {
      LEFT: 'text-left',
      CENTER: 'text-center',
      RIGHT: 'text-right',
    };
    classes.push(alignMap[style.textAlignHorizontal]);
  }

  // Text color
  if (fills && fills.length > 0 && fills[0].color) {
    const color = figmaColorToCSS(fills[0].color);
    classes.push(`text-[${color}]`);
  }

  return classes.join(' ');
}

/**
 * Parse Figma file URL to extract file key
 */
export function parseFigmaUrl(url: string): { fileKey: string; nodeId?: string } | null {
  // Match URLs like:
  // https://www.figma.com/file/{FILE_KEY}/...
  // https://www.figma.com/file/{FILE_KEY}/...?node-id={NODE_ID}
  const fileMatch = url.match(/figma\.com\/file\/([a-zA-Z0-9]+)/);
  const nodeMatch = url.match(/node-id=([a-zA-Z0-9-]+)/);

  if (fileMatch) {
    return {
      fileKey: fileMatch[1],
      nodeId: nodeMatch ? nodeMatch[1] : undefined,
    };
  }

  return null;
}