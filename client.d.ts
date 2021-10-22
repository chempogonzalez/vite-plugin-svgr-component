declare module '*.svg' {
  const component: React.FC<React.SVGProps<SVGSVGElement> & { title?: string }>;
  export default component; 
}
