/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Link from '../../components/Link';
import update from 'react/lib/update';
// import _ from 'lodash';

// import libary
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

// import sub-comp
import NewList from './components/NewList';
import PausedProfiles from './components/PausedProfiles';

// 1. Fn 'reorder' : a little function to help us with reordering the result
const reorder =  (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
// 2. Fn 'insertArrByIndx' : insert a value into Array by index
const insertArrByIndx = (arr, item, index) => {
  if (index >= arr.length) {
    arr.push(item);
  } else {
    arr = arr.reduce(function(s, a, i) {
      i == index ? s.push(item, a) : s.push(a);
      return s;
    }, []);
  }
  //console.log(arr);
  return arr;
}

/** MAIN CLASS ----- */
class Home extends React.Component {
  static propTypes = {
    title: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  componentWillMount() {

    /** FAKED DATA for The LIST */
    let arrNew = [
      {
        id: 1,
        title: 'Internations',
        desc: ''
      },
      {
        id: 2,
        title: 'Designer',
        desc: 'Freelancer, Female'
      },
      {
        id: 3,
        title: 'Product owner',
        desc: 'Startup, Corporate'
      },
      {
        id: 4,
        title: 'Digital producer',
        desc: 'Startup, Corporate, Freelancer ...'
      },
      {
        id: 5,
        title: 'SEO specialist',
        desc: 'Startup, Corporate ...'
      }
    ];
    let arrPaused = [
      {
        id: 6,
        title: 'Web designer',
        desc: 'Hyper Island, Female'
      },
      {
        id: 7,
        title: 'Surprise me',
        desc: '(An unexpected match is chosen)'
      },
      {
        id: 8,
        title: 'Growth hacker',
        desc: 'Startup, 25-35 years old'
      }
    ];

    // create list profile
    this.setState({
      profiles: [arrNew,arrPaused]
    });
  }

  async onDragEnd(r) {
    // console.log('onDragEnd',r);
    const {profiles} = this.state;
    // 1. dropped outside the list
    if (!r.destination) {
      return;
    }

    let desIndx = parseInt(r.destination.droppableId);
    let srcIndx = parseInt(r.source.droppableId);
    // 2. Dropped other group
    if (desIndx != srcIndx) {

      let tempArr = insertArrByIndx(profiles[desIndx],
                              profiles[srcIndx][r.source.index],
                              r.destination.index);
      profiles[srcIndx].splice(r.source.index,1);

      // Set State
      await this.setState(update(this.state, {
        profiles: {
          [desIndx] : {
            $set: tempArr
          }
        }
      }));
      //console.log('profiles', profiles);
    }
    // 3. Same group
    else {
      // const arrNewProfiles = reorder(
      //   this.state.arrNewProfiles,
      //   r.source.index,
      //   r.destination.index
      // );
      // this.setState({
      //   arrNewProfiles,
      // });

      await this.setState(update(this.state, {
        profiles: {
          [desIndx] : {
            $set: reorder(
              profiles[desIndx],
              r.source.index,
              r.destination.index
            )
          }
        }
      })); // setState
    }
  }

  render() {
    const {profiles} = this.state;
    return (
      <div className="profile_wrap">
          <div className="title_wrap">
            <h1 className="ttl">Match profiles</h1>
            <Link to={'/#'} className="addnew"><span>+</span></Link>
          </div>
          {/* END TITLE */}

          <DragDropContext onDragEnd={this.onDragEnd}>
            <div>
            <Droppable droppableId="0">
              {(provided, snapshot) => (
                <div ref={provided.innerRef} className={snapshot.isDraggingOver ? 'box-dragging' : ''}>
                  {profiles[0] !== null && <NewList dataNews={profiles[0]}/>}
                  {/* END NEW LIST */}
                </div>
              )}
            </Droppable>
            <Droppable droppableId="1">
              {(provided, snapshot) => (
                <div ref={provided.innerRef}>
                  {profiles[1] !== null && <PausedProfiles dataProfiles={profiles[1]}/>}
                  {/* END PAUSED PROFILES */}
                </div>
              )}
            </Droppable>
            </div>
          </DragDropContext>

          <div className="button_wrap">
            <button type="button">Submit profiles</button>
          </div>
          {/* END BUTTON SUBMIT */}
      </div>
    );
  }
}

export default Home;
