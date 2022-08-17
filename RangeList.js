/**
 * Created by Xiaodong Liu on 8/16/22.
 */

class RangeList{
    constructor() {
        this.ranges = [];
    }

    /**
     * Conduct binary search to get the index of the lowest range whose left boundary is greater than val
     * @param {number} val - Integer to be compared with the beginning of each range in the list
     * @return {number}
     */
    upper_bound(val){
        let left = 0, right = this.ranges.length;
        while(left < right){
            let mid = Math.floor(left + ((right-left)>>1)); // [(left+right)/2]
            if(this.ranges[mid][0] <= val){
                left = mid+1;
            }else{
                right = mid;
            }
        }
        return left;
    }

    /**
     * Get string of all the ranges exist in the list
     * @return {string}
     */
    getRanges(){
        let str = "";
        for(const range of this.ranges){
            str += '[' + range[0] + ', ' + range[1] + ') '
        }
        return str.slice(0, -1);
    }

    /**
     * Check if range is valid or not.
     * @description Range's start and end should both be number and start <= end.
     * When start = end, the range is considered to be empty, and it's valid
     * @param {Array<number>} range - Array of two integers that specify beginning and end of range
     * @return {boolean}
     */
    check(range){
        if(typeof range[0] != 'number' || typeof range[1] != 'number'){
            throw new Error('Range should be a pair of number');
        }
        if(range[0] > range[1]){
            throw new Error('End should be greater than ot equal to start');
        }
    }

    /**
     * Adds a range to the list
     * @param {Array<number>} range - Array of two integers that specify beginning and end of range
     * @return {void}
     */
    add(range){
        this.check(range);
        let left = range[0], right = range[1];

        // Initialize i to point to the leftmost range whose left bound is greater than that of new range
        let i = this.upper_bound(left);

        // Initialize j to point to the leftmost range whose left bound is greater than right exclusive bound of new range
        let j = this.upper_bound(right);

        // Let i point to the leftmost range whose right exclusive bound overlaps with the new range
        if(i > 0 && this.ranges[--i][1] < left){
            ++i;
        }

        if(i < j){
            // Replace the first to-be-deleted range with new merged range and erase other to-be-deleted ranges
            this.ranges[i] = [Math.min(this.ranges[i][0], left), Math.max(this.ranges[j-1][1], right)];
            this.ranges.splice(i+1, j-i-1);
        }else{
            // No overlaps or no merges needed. Directly insert new range into the list
            this.ranges.splice(i, 0, [left, right]);
        }
    }

    /**
     * Removes a range from the list
     * @param {Array<number>} range - Array of two integers that specify beginning and end of range
     * @return {void}
     */
    remove(range){
        this.check(range);
        let left = range[0], right = range[1];

        // Initialize i to point to the leftmost range whose left bound is greater than that of new range
        let i = this.upper_bound(left);

        // Initialize j to point to the leftmost range whose left bound is greater than right exclusive bound of new range
        let j = this.upper_bound(right);

        // Let i point to the leftmost range overlaps with the new range
        if(i > 0 && this.ranges[--i][1] <= left){
            ++i;
        }

        if(i < j){
            // Potentially, at most two new ranges are created respectively from the leftmost overlapped range
            // and the rightmost overlapped range after removing the given range
            // a is the left bound of the first new range if such range exists
            // b is the right exclusive bound of the second end range if such range exists
            let a = Math.min(this.ranges[i][0], left);
            let b = Math.max(this.ranges[j-1][1], right);

            //Delete all the ranges overlapped with the given range
            this.ranges.splice(i, j-i);

            //Insert the two new ranges into the list if they exist
            if(a < left){
                this.ranges.splice(i++, 0, [a, left]);
            }
            if(b > right){
                this.ranges.splice(i, 0, [right, b]);
            }
        }
    }

    /**
     * Prints out the list of ranges in the range list
     * @return {void}
     */
    print(){
        console.log(this.getRanges());
    }

};

module.exports = RangeList;