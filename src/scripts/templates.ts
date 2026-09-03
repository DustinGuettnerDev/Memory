export function createFigure1({
    lineWidth = 80,
    reverse = false,
    shift = 0,
}: {
    lineWidth?: number;
    reverse?: boolean;
    shift?: number;
}): string {
    const lineOrder = reverse ? 1 : 2;
    const squareOrder = reverse ? 2 : 1;

    return `
    <div class="figure1" style="width: calc(${lineWidth}px + 15px); transform: translateX(${shift}px);">
      <div class="figure1__line" style="order:${lineOrder}; width:${lineWidth}px;"></div>
      <div class="figure1__square" style="order:${squareOrder};"></div>
    </div>
  `;
}
