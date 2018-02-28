(() => {
    class Clamp {
        constructor(options) {
            this.opts = {
                clamp: options.clamp || 2,
                useNativeClamp: typeof options.useNativeClamp != 'undefined' ? options.useNativeClamp : true,
                splitOnChars: options.splitOnChars || ['.', '-', '–', '—', ' '],
                animate: options.animate || false,
                trunChar: options.trunChar || '…',
                truncHtml: options.truncHtml,
            };
        }
        clamp(element) {
            const getCSSValue = (clampValue) => clampValue.length > 0 && (clampValue.indexOf('px') > -1 || clampValue.indexOf('em') > -1);
            const getTruncHtmlContainer = (truncHtml) => {
                if (truncHtml) {
                    const truncSpan = document.createElement('span')
                    truncSpan.innerHTML = truncHtml;
                    return truncHtml;
                }
                return;
            };
            const setClampValue = (clampValue, isCSSValue) => {
                if (clampValue === 'auto') {
                    return this.getMaxLines();
                }
                if (isCSSValue) {
                    return this.getMaxLines(parseInt(clampValue));
                }
                return clampValue;
            };
            const getClamping = (element, clampValue, useNativeClamp, clampedText) => {
                const setElementDetails = element => {
                    element.style.overflow = 'hidden';
                    element.style.textOverflow = 'ellipsis';
                    element.style.webkitBoxOrient = 'vertical';
                    element.style.display = '-webkit-box';
                    element.style.webkitLineClamp = clampValue;
                    if (isCSSValue) {
                        element.style.height = `${this.opts.clamp}px`;
                    }
                    return element;
                }
                const setClampedText = element => {
                    if (height < element.clientHeight) {
                        clampedText = this.truncate(this.getLastChild(element), height);
                    }
                }
                const supportsNativeClamp = typeof element.style.webkitLineClamp !== 'undefined';
                if (supportsNativeClamp && useNativeClamp) {
                    element = setElementDetails(element);
                } else {
                    const height = this.getMaxHeight(clampValue);
                    clampedText = setClampedText(element);
                }

            };
            let { clamp: clampValue } = this.opts
            const originalText = element.innerHTML;
            const isCSSValue = getCSSValue(clampValue);
            const truncHtmlContainer = getTruncHtmlContainer(this.opts.truncHtml);
            let clampedText = '';
            clampValue = setClampValue(clampValue, isCSSValue);

            return {
                'original': originalText,
                'clamped': clampedText,
            }
        }
    }
})