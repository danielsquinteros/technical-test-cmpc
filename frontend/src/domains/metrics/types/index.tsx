
export interface Trace {
  x: string[];
  y: number [];
  type: string;
  text?: string[] | string;
  name?: string[] | string;
  textposition?: string;
  hoverinfo?: string;
  opacity?: number;
  marker?: {
    color: string | string[];
    line?: {
      color: string;
      width: number;
    };
  };
}
export interface PieTrace {
    values: number[];
    labels: string[];
    type: 'pie';
  }

export interface Layout {
    title?: {
      text: string;
    };
    height?: number;
    width?: number;
}