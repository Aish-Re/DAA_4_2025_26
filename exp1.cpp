#include <bits/stdc++.h>
using namespace std;
using namespace chrono;

void complexRec(int n) {


   if (n <= 2) {
       return;
   }


   int p = n;
   while (p > 0) {
       vector<int> temp(n);
       for (int i = 0; i < n; i++) {
           temp[i] = i ^ p;
       }
       p >>= 1;
   }


   vector<int> small(n);
   for (int i = 0; i < n; i++) {
       small[i] = i * i;
   }


   if (n % 3 == 0) {
       reverse(small.begin(), small.end());
   } else {
       reverse(small.begin(), small.end());
   }


   complexRec(n / 2);
   complexRec(n / 2);
   complexRec(n / 2);
}

int main() {
    vector<int> inputSizes = {100, 200, 400, 800, 1600};
    for (int n : inputSizes) {
        auto start = high_resolution_clock::now();
        complexRec(n);
        auto stop = high_resolution_clock::now();
        auto duration = duration_cast<milliseconds>(stop - start);
        cout <<duration.count();
    }
}