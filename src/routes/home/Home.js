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
  arr = arr.reduce(function(s, a, i) {
    i == index ? s.push(item, a) : s.push(a);
    return s;
  }, []);
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
      arrNewProfiles: arrNew,
      arrPausedProfiles: arrPaused
    });
  }

  onDragEnd(result) {
    console.log('onDragEnd',result);
    const {arrNewProfiles, arrPausedProfiles} = this.state;
    // 1. dropped outside the list
    if (!result.destination) {
      return;
    }
    // 2. Dropped other group
    if (result.destination.droppableId != result.source.droppableId) {
      if (result.source.droppableId == '1') {
        let tempArr = insertArrByIndx(arrPausedProfiles, arrNewProfiles[result.source.index], result.destination.index);
        arrNewProfiles.splice(result.source.index,1);

        // Set State
        this.setState({
          arrNewProfiles,
          arrPausedProfiles: tempArr
        });
      }
      if (result.source.droppableId == '2') {
        let tempArr = insertArrByIndx(arrNewProfiles, arrPausedProfiles[result.source.index], result.destination.index);
        arrPausedProfiles.splice(result.source.index,1);

        // Set State
        this.setState({
          arrNewProfiles,
          arrNewProfiles: tempArr
        });
      }
    }
    // 3. Same group
    else {
      const arrNewProfiles = reorder(
        this.state.arrNewProfiles,
        result.source.index,
        result.destination.index
      );
      this.setState({
        arrNewProfiles,
      });
    }


  }

  render() {
    const {arrNewProfiles, arrPausedProfiles} = this.state;
    return (
      <div className="profile_wrap">
          <div className="title_wrap">
            <h1 className="ttl">Match profiles</h1>
            <Link to={'/#'} className="addnew"><span>+</span></Link>
          </div>
          {/* END TITLE */}

          <DragDropContext onDragEnd={this.onDragEnd}>
            <div>
            <Droppable droppableId="1">
              {(provided, snapshot) => (
                <div ref={provided.innerRef}>
                  {arrNewProfiles !== null && <NewList dataNews={arrNewProfiles}/>}
                  {/* END NEW LIST */}
                </div>
              )}
            </Droppable>
            <Droppable droppableId="2">
              {(provided, snapshot) => (
                <div ref={provided.innerRef}>
                  {arrPausedProfiles !== null && <PausedProfiles dataProfiles={arrPausedProfiles}/>}
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
