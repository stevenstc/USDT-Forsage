import React, { Component } from "react";
import PropTypes from "prop-types";
import keyboardEvents from "./events";
import style from "./styles.scss";
import arrow_down from "./assets/arrow_down.svg";

export default class FaqItem extends Component {
    static propTypes = {
        config: PropTypes.object,
        data: PropTypes.object,
        rowid: PropTypes.number,
        getRowOptions: PropTypes.func,
    };

    state = {
        isExpanded: false,
        ref: React.createRef(),
        rowRef: React.createRef(),
        height: 0,
        rowClassName: "closed",
    };

    getSnapshotBeforeUpdate(prevProps, prevState) {
        const { isExpanded: wasOpen } = prevState;
        const { isExpanded: isOpen } = this.state;
        const { config: { animate = true } = {} } = this.props;

        let rowClassName;
        if (isOpen !== wasOpen) {
            if (isOpen) {
                rowClassName = animate ? "expanding" : "expanded";
            } else {
                rowClassName = animate ? "closing" : "closed";
            }

            return {
                rowClassName,
            };
        }
        return null;
    }

    finishTransition = () => {
        const { isExpanded: isOpen } = this.state;
        this.setState({ rowClassName: isOpen ? "expanded" : "closed" });
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { config: { animate = true } = {} } = this.props;
        if (snapshot !== null) {
            this.setState(
                {
                    ...snapshot,
                },
                animate ? this.setHeight : undefined,
            );
        }
    }

    componentDidMount() {
        const { rowRef } = this.state;

        if (this.props.getRowOptions) {
            const options = {
                expand: () => {
                    this.toggle(true);
                },
                close: () => {
                    this.toggle(false);
                },
                scrollIntoView: (opt) => {
                    if (opt) {
                        rowRef.current.scrollIntoView(opt);
                    } else {
                        rowRef.current.scrollIntoView();
                    }
                },
            };
            this.props.getRowOptions(options);
        }
    }

    toggle = (flag) => {
        this.setState(() => {
            return { isExpanded: flag };
        });
    };

    expand = () => {
        this.setState((prevState) => {
            return { isExpanded: !prevState.isExpanded };
        });
    };

    keyPress = (event) => {
        const code = event.keyCode ? event.keyCode : event.which;

        switch (keyboardEvents.keyCodes[code]) {
            case "space":
            case "return":
                event.preventDefault();
                event.stopPropagation();
                this.expand();
                break;
            default:
                break;
        }
    };

    setHeight = () => {
        const { ref, isExpanded } = this.state;
        const height = ref.current.scrollHeight;
        this.setState({
            height: isExpanded ? height : 0,
        });
    };

    render() {
        const {
            data: { title, content },
            config: { animate = true, arrowIcon, tabFocus = false } = {},
        } = this.props;

        const { isExpanded, ref, height, rowClassName, rowRef } = this.state;

        const attrs = {
            onClick: this.expand,
            role: "button",
            "aria-expanded": isExpanded,
            "aria-controls": `react-faq-rowcontent-${this.props.rowid}`,
            // tabIndex: 0,
            onKeyPress: this.keyPress,
            onKeyDown: this.keyPress,
        };

        if (tabFocus) {
            attrs.tabIndex = 0;
        }

        const contentAttrs = {
            role: "region",
            id: `react-faq-rowcontent-${this.props.rowid}`,
            "aria-expanded": isExpanded,
            "aria-hidden": !isExpanded,
            onTransitionEnd: this.finishTransition,
        };

        if (animate) {
            contentAttrs["style"] = {
                height,
            };
        }

        const className = [
            "row-title",
            rowClassName,
            style["row-title"],
            style[rowClassName],
            tabFocus ? "" : style["no-tabfocus"],
        ]
            .filter(Boolean)
            .join(" ");

        const icon = arrowIcon || (
            <div
                dangerouslySetInnerHTML={{ __html: arrow_down }}
                className={`arrow-image ${style["arrow-image"]}`}
                alt="Expand arrow"
            />
        );

        const contentClasses = [
            style["row-content"],
            "row-content",
            animate ? style["animate"] : style["static"],
        ].join(" ");

        const contentTextClasses = [style["row-content-text"], "row-content-text"].join(" ");
        const rowItem =
            content && typeof content === "string" ? (
                <div className={contentTextClasses} dangerouslySetInnerHTML={{ __html: content }} />
            ) : (
                <div className={contentTextClasses}>{content}</div>
            );

        return (
            <section className={`faq-row ${style["faq-row"]}`} role="listitem" ref={rowRef}>
                <div className={className} {...attrs}>
                    <div
                        className={`row-title-text ${style["row-title-text"]}`}
                        id={`react-faq-rowtitle-${this.props.rowid}`}
                    >
                        {title}
                    </div>
                    <span className={`icon-wrapper ${style["icon-wrapper"]}`} aria-hidden="true">
                        {icon}
                    </span>
                </div>
                <div className={contentClasses} {...contentAttrs} ref={ref}>
                    {rowItem}
                </div>
            </section>
        );
    }
}
