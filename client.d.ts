declare module '*.svg' {
  const component: React.FC<React.SVGProps<SVGSVGElement> & { title?: string, titleId?: string }>;
  export default component;
}
