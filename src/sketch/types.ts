import p5 from 'p5'

export type Renderer = () => void;
export type p = p5;
export type SetupRendererI = (p: p5, renderers: Renderer[]) => () => void
