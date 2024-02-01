import { cnb } from 'cnbuilder';
import * as React from 'react';
import { AXIS_DIRECTION, ElementPropsWithElementRefAndRenderer } from './types';
import { isFun, isUndef, mergeRefs, renderDivWithRenderer } from './util';

export interface ScrollbarTrackClickParameters {
  axis: AXIS_DIRECTION;
  offset: number;
}

export type ScrollbarTrackProps = ElementPropsWithElementRefAndRenderer & {
  axis: AXIS_DIRECTION;

  onClick?: (ev: MouseEvent, values: ScrollbarTrackClickParameters) => void;

  ref?: (ref: ScrollbarTrack | null) => void;
};

export default class ScrollbarTrack extends React.Component<ScrollbarTrackProps, unknown> {
  public elementRef = React.createRef<HTMLDivElement>();

  public componentDidMount(): void {
    if (!this.elementRef.current) {
      this.setState(() => {
        throw new Error(
          "Element was not created. Possibly you haven't provided HTMLDivElement to renderer's `elementRef` function."
        );
      });
      return;
    }
    this.elementRef.current.addEventListener('click', this.handleClick);
  }

  public componentWillUnmount(): void {
    this.elementRef.current?.removeEventListener('click', this.handleClick);
  }

  private handleClick = (ev: MouseEvent) => {
    if (!ev || !this.elementRef.current || ev.button !== 0) {
      return;
    }

    if (isFun(this.props.onClick) && ev.target === this.elementRef.current) {
      if (!isUndef(ev.offsetX)) {
        this.props.onClick(ev, {
          axis: this.props.axis,
          offset: this.props.axis === AXIS_DIRECTION.X ? ev.offsetX : ev.offsetY,
        });
      } else {
        // support for old browsers
        /* istanbul ignore next */
        const rect = this.elementRef.current.getBoundingClientRect();
        /* istanbul ignore next */
        this.props.onClick(ev, {
          axis: this.props.axis,
          offset:
            this.props.axis === AXIS_DIRECTION.X
              ? (ev.clientX || (ev as unknown as TouchEvent).touches[0].clientX) - rect.left
              : (ev.clientY || (ev as unknown as TouchEvent).touches[0].clientY) - rect.top,
        });
      }
    }

    return true;
  };

  public render(): React.ReactElement<any> | null {
    const {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      elementRef,

      axis,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onClick,

      ...props
    } = this.props as ScrollbarTrackProps;

    props.className = cnb(
      'ScrollbarsCustom-Track',
      axis === AXIS_DIRECTION.X ? 'ScrollbarsCustom-TrackX' : 'ScrollbarsCustom-TrackY',
      props.className
    );

    if (props.renderer) {
      (props as ScrollbarTrackProps).axis = axis;
    }

    return renderDivWithRenderer(props, mergeRefs([this.elementRef, elementRef]));
  }
}
