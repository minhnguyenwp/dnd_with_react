import React from 'react';
import PropTypes from 'prop-types';

// import libary
import { Draggable } from 'react-beautiful-dnd';

const getItemStyle = (draggableStyle, isDragging) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  ...draggableStyle,
});

const getStayedItemStyle = (isDragging) => {

    return {
        backgroundColor: isDragging ? '#ededed' : '',
        boxShadow: isDragging ? 'inset 0px 0px 10px #bbb' : '',
        zIndex: isDragging ? '0' : '1'
    };
};

class NewList extends React.Component {
    static propTypes = {
        dataNews: PropTypes.array,
    };

    render() {
        const {dataNews} = this.props;

        return (
            <div className="list_profile new">
                {dataNews.map((item, idx) => {
                    return(
                        <Draggable key={item.id} draggableId={item.id}>
                            {(provided, snapshot) => (
                                <div className="itm-w"
                                    style={getStayedItemStyle(
                                        snapshot.isDragging
                                    )}>
                                    <div className="num-clip">
                                        <div className={"num "}>
                                            <span>{idx+1}</span>
                                        </div>
                                    </div>
                                    <div
                                    ref={provided.innerRef}
                                    style={getItemStyle(
                                        provided.draggableStyle,
                                        snapshot.isDragging
                                    )}
                                    {...provided.dragHandleProps}
                                    >
                                    <div className={"profile_itm "
                                        + (snapshot.isDragging ? 'dragging' : '')}>
                                        <div className="inner">
                                            <div className="content">
                                                <div className={"num " + (snapshot.isDragging ? 'dragging' : '') } >

                                                </div>
                                                <div className="blk_content">
                                                    <div className="wrap">
                                                        <h3 className="ttl">{item.title}</h3>
                                                        {item.desc !== " " && <div className="desc">{item.desc}</div>}
                                                    </div>
                                                    <figure className="icon_drag">
                                                        <img src='./images/dragger.svg' alt="Dragger"/>
                                                    </figure>
                                                </div>
                                                <img src='./images/shadow.png' alt="shadow" className="shadow-img"/>
                                            </div>
                                        </div>

                                    </div>
                                    </div>
                                    {provided.placeholder}
                                </div>
                            )}
                        </Draggable>
                    )
                })}
                {/* END ITEM */}
            </div>
        )
    }
}
export default NewList;
