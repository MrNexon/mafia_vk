import React from "react";
import "./CenterPanel.css";

class CenterPanel extends React.Component {
    render() {
        return (
            <div className="center__wrapper">
                <div className="center__panel">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default CenterPanel;