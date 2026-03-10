class Solution {
  public:
    vector<int> maxOfSubarrays(vector<int>& arr, int k) {
        vector<int> a;

        for(int i = 0; i < arr.size() +1 - k; i++) {
            int maxi = arr[i];
            for(int j = i; j < i + k; j++) {
                maxi = max(maxi, arr[j]);
            }
            a.push_back(maxi);
        }

    return a;
    }
};