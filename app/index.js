// React Version

// /** @jsx React.DOM */

// /**
//  * CONSTANTS
//  */

// var keyMirror = require('react/lib/keyMirror');
// var AppConstants = keyMirror({
//   GO_FORWARD: null,
//   GO_BACKWARD: null
// });

// /**
//  * DISPATCHERS
//  */

// var Promise = require('es6-promise').Promise;
// var merge = require('react/lib/merge');
// var _callbacks = [];
// var _promises = [];

// var Dispatcher = function() {};
// Dispatcher.prototype = merge(Dispatcher.protoype, {
//   register: function(callback) {
//     _callbacks.push(callback);
//     return _callbacks.length;
//   },

//   dispatch: function(payload) {
//     var resolves = [];
//     var rejects =[];

//     _promises = _callbacks.map(function(_, i) {
//       return new Promise(function(resolve, reject) {
//         resolves[i] = resolve;
//         rejects[i] = reject;
//       });
//     });

//     _callbacks.map(function(callback, i) {
//       Promise.resolve(callback(payload)).then(function() {
//         resolves[i](payload);
//       }, function() {
//         rejects[i](new Error('Dispatcher callback was unsuccessful'));
//       });
//     });

//     _promises = [];
//   },

//   waitFor: function(promiseIndexes, callback) {
//     var selectedPromises = promiseIndexes.map(function(index) {
//       return _promises[index];
//     });

//     Promise.all(selectedPromises).then(callback);
//   }
// });

// var AppDispatcher = merge(Dispatcher.prototype, {
//   handleViewAction: function(action) {
//     this.dispatch({
//       source: 'VIEW_ACTION',
//       action: action
//     });
//   }
// });

// /**
//  * STORES
//  */

// var EventEmitter = require('events').EventEmitter;
// var CHANGE_EVENT = 'change';
// var _currentIndex = 0;
// var _items = ['one', 'two', 'three', 'four'];

// function _controlCurrentIndex() {
//   if (_currentIndex < 0) {
//     _currentIndex = _items.length - 1;
//   }
//   else if (_currentIndex >= _items.length) {
//     _currentIndex = 0;
//   }
// }

// function _setCurrentIndex(index) {
//   _currentIndex = index;
//   _controlCurrentIndex();
// }

// var AppStore = merge(EventEmitter.prototype, {
//   emitChange: function() {
//     this.emit(CHANGE_EVENT);
//   },

//   addChangeListener: function(callback) {
//     this.on(CHANGE_EVENT, callback);
//   },

//   removeChangeListener: function(callback) {
//     this.removeListener(CHANGE_EVENT, callback);
//   },

//   getItems: function() {
//     return _items;
//   },

//   getCurrentIndex: function() {
//     return _currentIndex;
//   },

//   getCurrentItem: function() {
//     return _items[_currentIndex];
//   },

//   dispatcherIndex: AppDispatcher.register(function(payload) {
//     switch (payload.action.actionType) {
//       case AppConstants.GO_FORWARD:
//         _setCurrentIndex(_currentIndex + 1);
//         break;
//       case AppConstants.GO_BACKWARD:
//         _setCurrentIndex(_currentIndex - 1);
//         break;
//     }
//     AppStore.emitChange();
//     return true;
//   })
// });

// var AppActions = {
//   goForward: function() {
//     AppDispatcher.handleViewAction({
//       actionType: AppConstants.GO_FORWARD
//     });
//   },

//   goBackward: function() {
//     AppDispatcher.handleViewAction({
//       actionType: AppConstants.GO_BACKWARD
//     });
//   }
// };

// var React = require('react');

// function getCurrentItem() {
//   return { item: AppStore.getCurrentItem() };
// }

// var Navigation = React.createClass({
//   handlePrevious: function(e) {
//     AppActions.goBackward();
//     e.preventDefault();
//   },

//   handleNext: function(e) {
//     AppActions.goForward();
//     e.preventDefault();
//   },

//   render: function() {
//     return (
//       <div className="Navigation">
//         <button type="button" onClick={this.handlePrevious}>Previous</button>
//         <button type="button" onClick={this.handleNext}>Next</button>
//       </div>
//     );
//   }
// });

// var Display = React.createClass({
//   getInitialState: function() {
//     return getCurrentItem();
//   },

//   componentDidMount: function() {
//     AppStore.addChangeListener(this._onChange);
//   },

//   componentWillUnmount: function() {
//     AppStore.removeChangeListener(this._onChange);
//   },

//   _onChange: function() {
//     this.setState(getCurrentItem());
//   },

//   render: function() {
//     return (
//       <div className="Display">
//         <h1>{this.state.item}</h1>
//       </div>
//     );
//   }
// });

// var Carousel = React.createClass({
//   render: function() {
//     return (
//       <div className="Carousel">
//         <Navigation />
//         <Display />
//       </div>
//     );
//   }
// });

// React.renderComponent(<Carousel />, document.body);

// jQuery version

var $ = require('jquery');
var $next = $('.next');
var $prev = $('.prev');
var $title = $('.display-title');
var $carousel = $('.carousel ul');
var $items = $('.carousel li');

var _currentIndex = 0;
var _items = ['one', 'two', 'three', 'four'];

function _controlCurrentIndex() {
  if (_currentIndex >= _items.length) {
    _currentIndex = 1;
  }
  else if (_currentIndex < 0) {
    _currentIndex = _items.length - 2;
  }
  if (currentIndex === 0) {
    return -1;
  }
  else if (currentIndex === _items.length - 1) {
    return 1;
  }
  else {
    return 0;
  }
}

function _updateData(jump) {
  $title.html(_items[_currentIndex]);
  $currentItem = $items.eq(_currentIndex);
  var containerOffset = $carousel.offset().left;
  var itemOffset = $currentItem.offset().left;
  $carousel.stop().animate({
    'margin-left': -(itemOffset - containerOffset)
  }, 175, function() {
    // if (jump === 1) {
    //   $(carousel).css('margin-left', 0);
    // }
    // else if (jump === -1) {
    //   $(carousel).css('margin-left', 0);
    // }
  });
}

function _setCurrentIndex(index) {
  _currentIndex = index;
  var jump = _controlCurrentIndex();
  _updateData(jump);
}

function _goForward() {
  _setCurrentIndex(_currentIndex + 1);
}

function _goBackward() {
  _setCurrentIndex(_currentIndex - 1);
}

$next.on('click', _goForward);
$prev.on('click', _goBackward);
_updateData();

// $('.carousel ul li:nth-child(2)').hide();

// $('.carousel ul li:first-child').on('click', function() {
//   $('.carousel ul li:nth-child(2)')
//     .fadeIn()
//     .css({
//       color: 'red',
//       backgroundColor: 'green'
//     })
//     .animate({
//       marginTop: '20em'
//     })
//     .animate({
//       marginLeft: '20em'
//     });
// });
