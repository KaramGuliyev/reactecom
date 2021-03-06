import React from "react";
import Button from "../forms/Buttons/Buttons";

const LoadMore = ({
    onLoadMoreEvt = () => { },
}) => {
    return (
        <Button onClick = {() => onLoadMoreEvt()}>
            Load More
        </Button>
    )
};

export default LoadMore;