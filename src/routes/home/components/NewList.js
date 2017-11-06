import React from 'react';
import PropTypes from 'prop-types';

// import libary
import { Draggable } from 'react-beautiful-dnd';

// using some little inline style helpers to make the app look okay
const grid = 10;
const getItemStyle = (draggableStyle, isDragging) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
//   padding: grid * 2,
//   marginBottom: grid,

  // change background colour if dragging
  background: isDragging ? '' : '',

  // styles we need to apply on draggables
  ...draggableStyle,
});

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
                                <div>
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
                                                <div className="num">
                                                    <span>{idx+1}</span>
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
