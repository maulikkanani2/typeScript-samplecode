import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import style from "./EventStreamStyle";
import {tryParseJSON} from "../../helpers/json.helper";
import ReactJson from "react-json-view";
import {Typography} from "@material-ui/core";
import {Header} from "../eventStream.type";

interface EventBodyProps {
    body: string,
    contentTypeHeader: Header,
    classes: any
}
const getBodyComponent = ({body, contentTypeHeader}: {body: string, contentTypeHeader: Header}) => {
    if (contentTypeHeader && contentTypeHeader.value && contentTypeHeader.value.startsWith('application/json')) {
        const parsedJson = tryParseJSON(body)

        if (parsedJson || Array.isArray(parsedJson)) {

            return (
                <ReactJson src={parsedJson} collapsed={true} displayDataTypes={false} style={{"fontSize": "1.5rem"}}/>
            )
        }
    }

    return (
        <Typography> {body}</Typography>
    )
}
const EventBody: React.FC<EventBodyProps> = (props: EventBodyProps) => {
    const { body, contentTypeHeader} = props
    return (
        <React.Fragment>
            {getBodyComponent({body, contentTypeHeader})}
        </React.Fragment>
    )
}


export default withStyles(style)(EventBody)

