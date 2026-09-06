export function createFigure1({
    lineWidth = 80,
    lineHeight = 3,
    reverse = false,
    shift = 0,
    rotate = 0,
}: {
    lineWidth?: number;
    lineHeight?: number;
    reverse?: boolean;
    shift?: number;
    rotate?: number;
}): string {
    const lineOrder = reverse ? 1 : 2;
    const squareOrder = reverse ? 2 : 1;

    return `
    <div class="figure1" style="width: calc(${lineWidth}px + 15px); transform: translateX(${shift}px) rotate(${rotate}deg);">
      <div class="figure1__line" style="order:${lineOrder}; width:${lineWidth}px; height:${lineHeight}px;"></div>
      <div class="figure1__square" style="order:${squareOrder};"></div>
    </div>
  `;
}
