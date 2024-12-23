import * as React from 'react';
import { AXIS_DIRECTION, ElementPropsWithElementRefAndRenderer } from './types';
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
    elementRef: React.RefObject<HTMLDivElement>;
    componentDidMount(): void;
    componentWillUnmount(): void;
    private handleClick;
    render(): React.ReactElement<any> | null;
}
