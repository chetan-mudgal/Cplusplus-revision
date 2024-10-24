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