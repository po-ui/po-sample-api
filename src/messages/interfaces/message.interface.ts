
/**
 * Message interface
 */
export interface Message {
    helpUrl: string;

    detailedMessage: string;

    details: Array<MessageDetail>;

}

/**
* MessageDetail interface
*/
export interface MessageDetail {
    code: string;

    message: string;

    detailedMessage: string;
}
