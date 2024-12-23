import * as React from 'react';
import { DraggableData, DraggableEvent } from 'react-draggable';
import { AXIS_DIRECTION, ElementPropsWithElementRefAndRenderer } from './types';
export type DragCallbackData = Pick<DraggableData, Exclude<keyof DraggableData, 'node'>>;
export type ScrollbarThumbProps = ElementPropsWithElementRefAndRenderer & {
    axis: AXIS_DIRECTION;
    onDrag?: (data: DragCallbackData) => void;
    onDragStart?: (data: DragCallbackData) => void;
    onDragEnd?: (data: DragCallbackData) => void;
    ref?: (ref: ScrollbarThumb | null) => void;
};
export default class ScrollbarThumb extends React.Component<ScrollbarThumbProps, unknown> {
    private static selectStartReplacer;
    initialOffsetX: number;
    initialOffsetY: number;
    private prevUserSelect;
    private prevOnSelectStart;
    private elementRef;
    lastDragData: DragCallbackData;
    componentDidMount(): void;
    componentWillUnmount(): void;
    handleOnDragStart: (ev: DraggableEvent, data: DraggableData) => void;
    handleOnDrag: (ev: DraggableEvent, data: DraggableData) => void;
    handleOnDragStop: (ev?: DraggableEvent, data?: DraggableData) => void;
    handleOnMouseDown: (ev: MouseEvent) => void;
    render(): React.ReactElement<any> | null;
}
