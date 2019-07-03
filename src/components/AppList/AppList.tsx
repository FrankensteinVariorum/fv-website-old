import { Apparatus } from "../../data/spine";
import React from "react";

interface AppListProps {
    app: Apparatus;
}

class AppList extends React.Component <AppListProps> {
    render() {
        return (
            <p>AppList</p>
        )
    }
}

export default AppList;