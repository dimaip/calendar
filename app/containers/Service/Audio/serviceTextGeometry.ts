// Safari versions before the CSS zoom geometry fix report unscaled client
// rectangles. Detect element and Range behavior independently, without UA checks.
// https://bugs.webkit.org/show_bug.cgi?id=77998
export const createServiceTextGeometry = (root: HTMLElement) => {
    const probe = document.createElement('span');
    probe.style.cssText =
        'position:absolute;left:0;top:0;visibility:hidden;pointer-events:none;display:block;width:20px;font-size:16px';
    probe.textContent = 'M';
    document.body.appendChild(probe);
    const range = document.createRange();
    range.selectNodeContents(probe);
    const originalWidth = range.getBoundingClientRect().width;
    probe.style.zoom = '2';
    const scalesElements = probe.getBoundingClientRect().width > 30;
    const scalesRanges = range.getBoundingClientRect().width > originalWidth * 1.5;
    probe.remove();

    let zoom = 1;
    const refresh = () => {
        zoom = 1;
        if (scalesElements && scalesRanges) return;
        for (let element: HTMLElement | null = root; element; element = element.parentElement) {
            zoom *= Number.parseFloat(getComputedStyle(element).zoom) || 1;
        }
    };
    refresh();

    return {
        refresh,
        getBoundingClientRect(target: Element | Range) {
            const rect = target.getBoundingClientRect();
            const scale = (target instanceof Range ? scalesRanges : scalesElements) ? 1 : zoom;
            return new DOMRect(rect.x * scale, rect.y * scale, rect.width * scale, rect.height * scale);
        },
        getClientRects(target: Range) {
            const scale = scalesRanges ? 1 : zoom;
            return Array.from(
                target.getClientRects(),
                (rect) => new DOMRect(rect.x * scale, rect.y * scale, rect.width * scale, rect.height * scale)
            );
        },
    };
};
