'use client';

import { useState, useEffect } from 'react';
import { getFigmaFile, extractFrames, FigmaNode } from '@/lib/figma';

interface FigmaDesignProps {
  fileKey: string;
  onSelectFrame?: (frame: FigmaNode) => void;
}

export default function FigmaDesign({ fileKey, onSelectFrame }: FigmaDesignProps) {
  const [file, setFile] = useState<FigmaNode | null>(null);
  const [frames, setFrames] = useState<FigmaNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFigmaFile() {
      try {
        setLoading(true);
        const data = await getFigmaFile(fileKey);
        setFile(data.document);
        setFrames(extractFrames(data.document));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch Figma file');
      } finally {
        setLoading(false);
      }
    }

    if (fileKey) {
      fetchFigmaFile();
    }
  }, [fileKey]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2">Loading Figma design...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
        <h3 className="font-semibold mb-2">Error Loading Figma Design</h3>
        <p>{error}</p>
        <p className="mt-2 text-sm">
          Make sure your FIGMA_ACCESS_TOKEN is valid and the file key is correct.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Figma Frames</h2>
      <p className="text-gray-600">
        Select a frame to generate React component
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {frames.map((frame) => (
          <div
            key={frame.id}
            onClick={() => onSelectFrame?.(frame)}
            className="cursor-pointer border border-gray-200 rounded-lg p-4 hover:border-blue-500 hover:shadow-md transition-all"
          >
            <div className="aspect-video bg-gray-100 rounded mb-2 flex items-center justify-center">
              {frame.absoluteBoundingBox ? (
                <span className="text-xs text-gray-400">
                  {frame.absoluteBoundingBox.width} × {frame.absoluteBoundingBox.height}
                </span>
              ) : null}
            </div>
            <h3 className="font-medium truncate">{frame.name}</h3>
            <p className="text-xs text-gray-400">{frame.type}</p>
          </div>
        ))}
      </div>

      {frames.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          No frames found in this Figma file
        </div>
      )}
    </div>
  );
}