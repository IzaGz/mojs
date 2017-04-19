// /**
//  * Unit tests for tween planner.
//  */
//
// var helpers = mojs.__helpers__;
// var TweenPlanner = helpers.TweenPlanner;
// var ClassProto = helpers.ClassProto;
// var tweenDefaults = helpers.tweenDefaults;
//
// var eps = 0.0000001;
//
// describe('tween planner ->', function() {
//
//   describe('extension', function() {
//     it('should extend `ClassProto`', function () {
//       var planner = new TweenPlanner;
//       expect(planner instanceof ClassProto).toBe(true);
//     });
//   });
//
//   describe('initialization ->', function() {
//     it('should have `defaults` of `tween` ->', function () {
//       var planner = new TweenPlanner;
//       expect(planner._defaults).toEqual(tweenDefaults);
//     });
//   });
//
//   describe('createPlan function ->', function() {
//     it('should call _calcTotalTime function', function () {
//       var planner = new TweenPlanner({
//         duration: 2000
//       });
//       spyOn(planner, '_calcTotalTime');
//       planner.createPlan();
//       expect(planner._calcTotalTime).toHaveBeenCalled();
//     });
//
//     describe('plan creaton ->', function() {
//       it('should create a plan #duration', function () {
//         var planner = new TweenPlanner({
//           duration: 128
//         });
//
//         expect(planner._plan)
//           .toEqual([ 81, 1, 1, 1, 1, 1, 1, 2561 ]);
//       });
//
//       it('should create a plan #delay #duration', function () {
//         var planner = new TweenPlanner({
//           duration: 176,
//           delay: 32
//         });
//         planner.createPlan();
//
//         expect(planner._plan)
//           .toEqual([ 81, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2561 ]);
//       });
//
//       it('should create a plan #duration #repeat', function () {
//         var planner = new TweenPlanner({
//           duration: 112,
//           repeat: 2
//         });
//         planner.createPlan();
//
//         // *  0 -> isDelay
//         // *  1 -> onUpdate
//         // *  2 -> isYoyo
//         // *  3 -> isYoyoBackward
//         // *  4 -> onStart
//         // *  5 -> onStartBackward
//         // *  6 -> onRepeatStart
//         // *  7 -> onRepeatStartBackward
//         // *  8 -> onRepeatComplete
//         // *  9 -> onRepeatCompleteBackward
//         // *  10 -> onComplete
//         // *  11 -> onCompleteBackward
//
//         expect(planner._plan)
//           // [
//           //   onStart, upd, upd, upd, upd, upd, onRepeatStartBackward/onRepeatCompleteBackward,
//           //   onRepeatComplete/onRepeatStart, upd, upd, upd, upd, upd, onRepeatStartBackward/onRepeatCompleteBackward,
//           //   onRepeatComplete/onRepeatStart, upd, upd, upd, upd, upd, onRepeatCompleteBackward/onCompleteBackward
//           // ]
//           .toEqual([
//             81, 1, 1, 1, 1, 1, 641,
//             321, 1, 1, 1, 1, 1, 641,
//             321, 1, 1, 1, 1, 1, 2561
//           ]);
//       });
//
//       it('should create a plan #delay #duration #repeat', function () {
//         var planner = new TweenPlanner({
//           duration: 112,
//           delay: 32,
//           repeat: 2
//         });
//         planner.createPlan();
//
//         // *  0 -> isDelay
//         // *  1 -> onUpdate
//         // *  2 -> isYoyo
//         // *  3 -> isYoyoBackward
//         // *  4 -> onStart
//         // *  5 -> onStartBackward
//         // *  6 -> onRepeatStart
//         // *  7 -> onRepeatStartBackward
//         // *  8 -> onRepeatComplete
//         // *  9 -> onRepeatCompleteBackward
//         // *  10 -> onComplete
//         // *  11 -> onCompleteBackward
//
//         expect(planner._plan)
//           // [
//           //   onStart, upd, upd, upd, upd, upd, onRepeatCompleteBackward,          |||  onRepeatComplete/delay, onRepeatStartBackward/delay, |||
//           //   onRepeatStart, upd, upd, upd, upd, upd, onRepeatCompleteBackward,    |||  onRepeatComplete/delay, onRepeatStartBackward/delay, |||
//           //   onRepeatStart, upd, upd, upd, upd, upd, onRepeatCompleteBackward/onCompleteBackward
//           // ]
//           .toEqual([
//             81, 1, 1, 1, 1, 1, 513,     256, 128,
//             65, 1, 1, 1, 1, 1, 513,     256, 128,
//             65, 1, 1, 1, 1, 1, 2561
//           ]);
//       });
//     });
//
//     // `isReverve` is not used yet
//     // describe('plan creaton #backward ->', function() {
//     //   it('should create a plan #duration', function () {
//     //     var planner = new TweenPlanner({
//     //       duration: 200,
//     //       isReverse: true
//     //     });
//     //     planner.createPlan();
//     //
//     //     expect(planner._plan)
//     //       .toEqual([ 56, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 14 ]);
//     //   });
//     //
//     //   it('should create a plan #delay #duration', function () {
//     //     var planner = new TweenPlanner({
//     //       duration: 200,
//     //       delay: 50,
//     //       isReverse: true
//     //     });
//     //     planner.createPlan();
//     //
//     //     expect(planner._plan)
//     //       .toEqual([ 56, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 14 ]);
//     //   });
//     //
//     //   it('should create a plan #delay #duration #repeat', function () {
//     //     var planner = new TweenPlanner({
//     //       duration: 100,
//     //       delay: 50,
//     //       repeat: 2,
//     //       isReverse: true
//     //     });
//     //     planner.createPlan();
//     //
//     //     expect(planner._plan)
//     //       .toEqual([ 56, 8, 8, 8, 8, 8, 12, 0, 0, 0, 24, 8, 8, 8, 8, 12, 0, 0, 0, 24, 8, 8, 8, 8, 8, 14 ]);
//     //   });
//     // });
//
//   });
//
//   describe('_calcTotalTime function ->', function() {
//     it('should calculate `totalTime #duration` ', function () {
//       var duration = 2000;
//       var options = { duration: duration };
//       var planner = new TweenPlanner(options);
//
//       planner._calcTotalTime();
//       expect(planner._totalTime).toBe(duration);
//     });
//
//     it('should calculate `totalTime #delay #duration` ', function () {
//       var duration = 2000;
//       var delay = 200;
//       var options = { duration: duration, delay: delay };
//       var planner = new TweenPlanner(options);
//
//       planner._calcTotalTime();
//       expect(planner._totalTime).toBe(duration + delay);
//     });
//
//     it('should calculate `totalTime #delay #duration #repeat` ', function () {
//       var duration = 2000;
//       var delay = 200;
//       var repeat = 3;
//       var planner = new TweenPlanner({
//         duration: duration,
//         delay: delay,
//         repeat: repeat
//       });
//
//       planner._calcTotalTime();
//       expect(planner._totalTime).toBe((repeat+1)*(delay+duration));
//     });
//
//     it('should be called on initialization` ', function () {
//       var duration = 2000;
//       var delay = 200;
//       var repeat = 3;
//       var planner = new TweenPlanner({
//         duration: duration,
//         delay: delay,
//         repeat: repeat
//       });
//
//       expect(planner._totalTime).toBe((repeat+1)*(delay+duration));
//     });
//   });
//
//   describe('_getPeriod function ->', function() {
//     it('should get current period #duration', function() {
//       var duration = 50;
//       var planner = new TweenPlanner({
//         duration: duration
//       });
//
//       expect(planner._getPeriod(0)).toBe(0);
//       expect(planner._getPeriod(eps)).toBe(0);
//       expect(planner._getPeriod(duration/2)).toBe(0);
//       expect(planner._getPeriod(duration - eps)).toBe(0);
//       expect(planner._getPeriod(duration)).toBe(0);
//       expect(planner._getPeriod(duration + eps)).toBe(1);
//     });
//
//     it('should get current period #delay #duration', function() {
//       var duration = 50;
//       var delay = 20;
//       var planner = new TweenPlanner({
//         delay: delay,
//         duration: duration
//       });
//
//       expect(planner._getPeriod(0)).toBe('delay');
//       expect(planner._getPeriod(eps)).toBe('delay');
//       expect(planner._getPeriod(delay/2)).toBe('delay');
//       expect(planner._getPeriod(delay - eps)).toBe('delay');
//       expect(planner._getPeriod(delay)).toBe(0);
//       expect(planner._getPeriod(delay + duration/2)).toBe(0);
//       expect(planner._getPeriod(delay + duration - eps)).toBe(0);
//       expect(planner._getPeriod(delay + duration)).toBe(0);
//       expect(planner._getPeriod(delay + duration + eps)).toBe(1);
//     });
//
//     it('should get current period #delay #duration', function() {
//       var duration = 50;
//       var delay = 20;
//       var repeat = 3;
//       var planner = new TweenPlanner({
//         delay: delay,
//         duration: duration,
//         repeat: repeat
//       });
//
//       expect(planner._getPeriod(0)).toBe('delay');
//       expect(planner._getPeriod(eps)).toBe('delay');
//       expect(planner._getPeriod(delay/2)).toBe('delay');
//       expect(planner._getPeriod(delay)).toBe(0);
//       expect(planner._getPeriod(delay + eps)).toBe(0);
//       expect(planner._getPeriod(delay + duration/2)).toBe(0);
//       expect(planner._getPeriod(delay + duration)).toBe(0);
//       expect(planner._getPeriod(delay + duration + eps)).toBe('delay');
//
//       var period = delay + duration;
//       expect(planner._getPeriod(period + eps)).toBe('delay');
//       expect(planner._getPeriod(period + delay/2)).toBe('delay');
//
//       expect(planner._getPeriod(period + delay)).toBe(1);
//       expect(planner._getPeriod(period + delay + eps)).toBe(1);
//       expect(planner._getPeriod(period + delay + duration/2)).toBe(1);
//       expect(planner._getPeriod(period + delay + duration)).toBe(1);
//       expect(planner._getPeriod(period + delay + duration + eps)).toBe('delay');
//
//       var period = 2*(delay + duration);
//       expect(planner._getPeriod(period + eps)).toBe('delay');
//       expect(planner._getPeriod(period + delay/2)).toBe('delay');
//
//       expect(planner._getPeriod(period + delay)).toBe(2);
//       expect(planner._getPeriod(period + delay + eps)).toBe(2);
//       expect(planner._getPeriod(period + delay + duration/2)).toBe(2);
//       expect(planner._getPeriod(period + delay + duration)).toBe(2);
//       expect(planner._getPeriod(period + delay + duration + eps)).toBe('delay');
//
//       var period = 3*(delay + duration);
//       expect(planner._getPeriod(period + eps)).toBe('delay');
//       expect(planner._getPeriod(period + delay/2)).toBe('delay');
//
//       expect(planner._getPeriod(period + delay)).toBe(3);
//       expect(planner._getPeriod(period + delay + eps)).toBe(3);
//       expect(planner._getPeriod(period + delay + duration/2)).toBe(3);
//       expect(planner._getPeriod(period + delay + duration)).toBe(3);
//       expect(planner._getPeriod(period + delay + duration + eps)).toBe(4);
//     });
//
//     it('should get the current period with #duration #repeat', function() {
//       var duration = 50;
//       var repeat = 3;
//       var planner = new TweenPlanner({
//         repeat: 3,
//         duration: duration
//       });
//
//       expect(planner._getPeriod(0)).toBe(0);
//       expect(planner._getPeriod(eps)).toBe(0);
//       expect(planner._getPeriod(duration / 2)).toBe(0);
//       expect(planner._getPeriod(duration - eps)).toBe(0);
//       expect(planner._getPeriod(duration)).toBe(0);
//
//       var period = duration;
//       expect(planner._getPeriod(period + duration / 2)).toBe(1);
//       expect(planner._getPeriod(period + duration)).toBe(1);
//       expect(planner._getPeriod(period + duration + eps)).toBe(2);
//
//       period = 2 * duration;
//       expect(planner._getPeriod(period + duration / 2)).toBe(2);
//       expect(planner._getPeriod(period + duration)).toBe(2);
//       expect(planner._getPeriod(period + duration + eps)).toBe(3);
//
//       period = 3 * duration;
//       expect(planner._getPeriod(period + duration / 2)).toBe(3);
//       expect(planner._getPeriod(period + duration)).toBe(3);
//       expect(planner._getPeriod(period + duration + eps)).toBe(4);
//     });
//
//     it('should return period number if time > endTime', function() {
//       var duration = 50;
//       var delay = 20;
//       var repeat = 2;
//       var planner = new TweenPlanner({
//         delay: delay,
//         duration: duration,
//         repeat: repeat
//       });
//
//       var period = 3 * (duration + delay);
//       expect(planner._getPeriod(period + delay / 2)).toBe(3);
//     });
//
//     it('should round instead of floor if time >= endTime', function() {
//       var duration = 50 + 3 / 2.123;
//       var repeat = 2;
//       var planner = new TweenPlanner({
//         duration: duration,
//         repeat: repeat
//       });
//
//       expect(planner._getPeriod(3 * duration)).toBe(2);
//       expect(planner._getPeriod((3 * duration) + eps)).toBe(3);
//     });
//
//     it('should not fail because of precision error', function() {
//       var duration = 500 + 4 / 10000.123;
//       var delay = 200 + 4 / 10000.123;
//       var repeat = 2;
//       var planner = new TweenPlanner({
//         delay: delay,
//         duration: duration,
//         repeat: repeat
//       });
//
//       return expect(planner._getPeriod(planner._totalTime)).toBe(2);
//       return expect(planner._getPeriod(planner._totalTime + eps)).toBe(3);
//     });
//   });
//
//   // `isReverse` is not used yet
//   // describe('reverse function ->', function () {
//   //   it('should reverse plan', function() {
//   //     var planner = new TweenPlanner({
//   //       repeat: 2,
//   //       duration: 50,
//   //       delay: 25
//   //     });
//   //
//   //     expect(planner._plan)
//   //       .toEqual([ 14, 8, 8, 24, 0, 12, 8, 24, 0, 0, 12, 8, 56 ]);
//   //
//   //     var result = planner.reverse();
//   //
//   //     expect(planner._plan)
//   //       .toEqual([ 56, 8, 12, 0, 0, 24, 8, 12, 0, 24, 8, 8, 14 ]);
//   //
//   //     expect(result).toBe(planner);
//   //
//   //   });
//   // });
// });
