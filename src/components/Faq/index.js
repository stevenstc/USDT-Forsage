import React, { Component } from "react";
import PropTypes from "prop-types";
import FaqItem from "./FaqItem";
import style from "./styles.scss";

export default class FaqComponent extends Component {
    static propTypes = {
        data: PropTypes.object,
        styles: PropTypes.object,
        config: PropTypes.object,
        getRowOptions: PropTypes.func,
    };

    state = {
        rowsOption: [],
    };

    componentDidMount() {
        if (this.props.getRowOptions) {
            this.props.getRowOptions(this.state.rowsOption);
        }
    }

    render() {
        const { title, rows = [] } = this.props.data || {};
        const { styles = {}, config: { animate } = {} } = this.props;

        const styleConfig = {
            "--faq-bg-color": styles.bgColor,
            "--title-text-color": styles.titleTextColor,
            "--title-text-size": styles.titleTextSize,
            "--row-title-color": styles.rowTitleColor,
            "--row-title-text-size": styles.rowTitleTextSize,
            "--row-content-color": styles.rowContentColor,
            "--row-content-text-size": styles.rowContentTextSize,
            "--row-content-padding-top": styles.rowContentPaddingTop,
            "--row-content-padding-bottom": styles.rowContentPaddingBottom,
            "--row-content-padding-right": styles.rowContentPaddingRight,
            "--row-content-padding-left": styles.rowContentPaddingLeft,
            "--arrow-color": styles.arrowColor,
            "--transition-duration": styles.transitionDuration,
            "--timing-function": styles.timingFunc,
        };

        const wrapperClass = `faq-row-wrapper ${style["faq-row-wrapper"]}`;
        const titleClass = `faq-title ${style["faq-row"]}`;
        const rowlistClass = `faq-body ${style["row-body"]}`;

        return (
            <div className={wrapperClass} style={styleConfig}>
                {title ? (
                    <section className={titleClass}>
                        <h2>{title}</h2>
                    </section>
                ) : null}
                {rows.length ? (
                    <section className={rowlistClass} role="list">
                        {rows.map((row, i) => {
                            return (
                                <FaqItem
                                    data={row}
                                    key={i}
                                    rowid={i + 1}
                                    config={this.props.config}
                                    getRowOptions={(options) =>
                                        (this.state.rowsOption[i] = options)
                                    }
                                />
                            );
                        })}
                    </section>
                ) : null}
            </div>
        );
    }
}
