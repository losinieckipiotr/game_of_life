export function draw(p, renderers) {
  return () => {
    renderers.forEach((render) => {
      render();
    });
  };
}
