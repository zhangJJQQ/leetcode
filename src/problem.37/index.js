/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {
    var map = {};
    var temp = headB;
    while (temp) {
        map[temp.val] = temp;
        temp = temp.next;
    }
    temp = headA;
    while (temp) {
        if (typeof map[temp.val] === 'object' && map[temp.val] == temp) {
            return map[temp.val];
        }
        temp = temp.next;
    }
    return null;
};