// 1. getline() method for taking a whole line as input
#include <iostream>
using namespace std;

int main() {
  string fullName;
  cout << "Type your full name"<<endl;
  getline(cin, fullName);
  cout<< "your full name is "<<fullName<<endl;
  return 0;
}


//2. Struct and enum
#include <iostream>
#include <string>
#include <cmath>
#include <vector>
using namespace std;

struct myDataType {
  int ll;
  string z;
};

enum Level {
  LOW,
  MEDIUM,
  HIGH
};

int main() {
  myDataType myStructure;
  enum Level myVar = MEDIUM;
  cout << myVar <<endl;

  myStructure.ll = 1;
  myStructure.z = "Hello world";
  
  cout << myStructure.ll << " "<<myStructure.z << endl;
  return 0;
}

// 3. reference vs pointer vs pointer dereference
#include <iostream>
#include <string>
using namespace std;

int main(){
  
  string food = "Pizza";
  string &meal = food;
  
  food = "hello";
  
  cout << &meal << " " << &food;
  
  string* ptr = &food;
  
  cout << *ptr <<endl;
  
  return 0;
}


//--------------------------------------------------STL--------------------------------------------------------------------------
#include <iostream>
#include <vector>
#include <set>
#include <map>
#include <unordered_map>
#include <stack>
#include <queue>
#include <list
#include<forward_list>
using namespace std;

#define watch(x) cout << (#x) << " is " << (x) << endl

int main() {
  
  // Pair
  pair<int, int> p1 = {1,2};
  pair<int, char> p2 = make_pair(2, 'a');
  
  cout<<"Pair p1 : "<<p1.first<<" "<<p1.second<<endl;
  cout<<"Pair p2: "<<p2.first<<" "<<p2.second<<endl;
  
  
  // Vector
  vector<int> v;
  
  for(auto it=v.begin(); it!=v.end(); it++){
   cout<<*it<<endl; 
  }
  
  // initialize vector with an std::array
  
  int n = 5;
  int arr[n] = {1, 2, 3,4, 5};
  vector<int> v1(arr, arr+n);
  
  vector<int> v2(n, 5);//create vector of 5 and initialize it with 5
  
  sort(v1.begin(), v1.end()); // sort the vector in ascending order
  
  vector<int>::iterator it = lower_bound(v1.begin(), v1.end(), 10); // return iterator to first element >=10
  
  
  // Set
  set<int> s;
  // takes logn to put the element in sorted order;
  
  s.insert(1);
  s.insert(5);
  s.insert(-3);
  s.insert(-10);
  
  for(int x: s) cout<< x<<endl;
  
  s.erase(1); // takes logn time to erase element
  
  auto it = s.find(-3);
  if(it == s.end()) cout<<"element not in set"<<endl;
  else cout<<*it<<" element is found"<<endl;
  
  auto it1 = s.upper_bound(-3);
  auto it2 =  s.upper_bound(5);
  
  if(it3 == s.end()) cout<<"not found"<<endl;
  else cout<<"found upper bound"<<endl;
  
  
  // pair in set
  set<pair<int, int>> s;
  
  s.insert({1, 2});
  s.insert({5, 10});
  s.insert({5, 11});
  
  // {1, 2}, {3, 1}, {5, 10}, {5, 11}
  for(pair<int, int> x : s)
     cout<<"{"<<x.first<<", "<<x.second<<"}, ";
     
  cout<<endl;
  
  set<pair<int, int>> sp = {{5, 10}, {14, 20}, {50, 100}, {75, 125}, {8, 16}};

  // sp = {{5, 10}, {8, 16}, {14, 20}, {50, 100}, {75, 125}};
  sp.lower_bound({4, 10}); // {5, 10}
  sp.lower_bound({5, 8}); // {5, 10}
  sp.lower_bound({5, 10}); // {5, 10}
  sp.lower_bound({5, 11}); // 
  
  
  // Map == internally it is implemented using Binary search tree
  map<int, int> m1, m2;
  map<char, int> mchar;
  
  string name= "csm";
  // map  initialization
  map<int, int> m = {{1, 2}, {2, 5}, {3, 7}, {4, 8}};
  
  m1.insert(make_pair(1, 10));
  m1.insert(make_pair(2, 20));
  m1.insert(make_pair(3, 30));
  m1.insert(make_pair(4, 40));
  
  m1.erase();
  
  for(auto x: m1) cout<<x.first<<" "<<x.second<<endl;
  
  m2[100] = 1;
  m2[200] = 2;
  m2[300] = 3;
  
  for(auto x : m2) cout<<x.first<<" "<<x.second<<endl;
  for(auto x : name) mChar[x]++;
  for(auto x : mChar) cout<<x.first<<" "<<x.second<<endl;

  cout<<"h count in abhishek is "<<mChar['h']<<endl;
  
  // Unordered map: usage an array to store the values
  map<char, int> m;
  unordered_map<char, int> um;
  
  string s = "aabhishek";
  
  for(char c: s) m[c]++;// O(NLogN) - N for iteration and logN for insertion
  
  for(char c: s) um[c++];// O(N) - N for iteration and O(1) for insertion
  
  // Stack and Queue
  
  // 1. stack => LIFO
  
  stack<int> s;
  s.push(1);
  s.push(2);
  s.push(3);
  s.push(4);
  
  while(!s.empty()){
      cout<<s.top()<<" ";
      s.pop();
  }
  
  queue<int> q;
  // FIFO
  q.push(1);
  q.push(2);
  q.push(3);
  q.push(4);
  
  while(!q.empty()){
    cout<<q.front()<<endl;
    q.pop();
  }
  
  // List => "doubly linked list" => every element in the list keeps track of both the previous and the next element
  
  
  list<int> l1;
  
  l1.push_back(3);
  l1.push_back(2);
  l1.push_front(1);
  
  for(int x: l) cout<<x<<" ";
  cout<<endl;
  
  cout<<l1.front()<<endl;
  cout<<l1.back()<<endl;
  
  // reverse the linked list
  l1.reverse();
  
  // remove an element from front of the list
  l1.pop_front();
  
  // remove an element from back of list
  l1.pop_back();
  
  // sort the linked list
  l1.sort();
  
  for(list<int> ::iterator it = l.begin(); it != l.end(); it++) cout<<*it<<endl;
  
  // Forward list => implements "singly linked list", every element in the list points to the element next to it;
  
  forward_list<int> fl = {1, 2, 3};
  
  fl.push_front(6);
  fl.push_front(5);
  fl.push_front(4);
  
  for(int x: fl) cout<<x<<endl;
  
  fl.pop_front();
  
  // Priority queue
  priority_queue<int> pq;
  
  pq.push(10);
  pq.push(15);
  pq.push(5);
  
  cout<< pq.size()<<endl;
  
  // get the maximum element in the priority queue
  cout<<pq.top()<<endl;
  
  while(!pq.empty()){
      cout<< pq.top() << " ";
      pq.pop();
  }
  
  cout<<endl;
  
  priority_queue<int, vector<int>, greater<int>> pq_min;
  pq_min.push(5);
  pq_min.push(1);
  pq_min.push(10);


  // Tuple and Tie
  tuple<int, int, int> t1 = make_tuple(1, 2, 3);
  tuple<char, int, double, int, long long int> t2 = make_tuple('a', 2, 2.3, 1, 1000);
  
  cout<<get<2>(t1)<< " "<<get<0>(t2)<<endl;
  
  int a, b, d=10, e=5, f=15;
  char c;
  
  tie(a, b, c) =. make_tuple(4, 1, 'a'); // this is equivalent to a=4, b=1, c='a'
  tie(a, b) = make_tuple(b, a); // swapping b and a;
  tie(d, e, f) = make_tuple(d+e+f, d+2*e, 10*d);
  
  watch(d), watch(e), watch(f);
  
  
  // bitset in c++
  int n = 9;
  bitset<32> b1(n);
  bitset<10> b2(n);
  bitset<32> b3(string("1001"));
  
  cout<<b1<<endl;
  cout<<b2<<endl;
  cout<<b3<<endl;

  return 0;
}