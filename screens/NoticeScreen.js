import { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet,ActivityIndicator,TextInput } from "react-native";
export default function NoticeScreen() {
  const [loading,setLoading]=useState(true);
  const [notices, setNotices] = useState([]);
  //
  const[allNotices,setAllNotices] = useState([])
  const [search,setSearch] = useState("")
  function handleSearch(text){
    setSearch(text);
    const filteredData=
    allNotices.filter((notice)=>
              notice.title
    .toLowerCase()
    .includes(text.toLowerCase())
    );
    setNotices(filteredData);
  }
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => {
        const fetchDate=data.slice(0, 10)
        setAllNotices(fetchDate);
        setNotices(fetchDate);
        setLoading(false)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  if(loading){
    return(
        <ActivityIndicator
        size="large"
        color="blue"
        />
    )
  }


  return (
    <View style={styles.container}>
      {/* search bar  */}
      <TextInput
      style={styles.search}
      placeholder="serach notices"
      value={search}
      onChangeText={handleSearch}
     />
      <Text style={styles.heading}>Campus Notices</Text>

      <FlatList
        data={notices}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.body}>{item.body}</Text>
          </View>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
  },

  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#263e56",
  },

  card: {
    backgroundColor: "#d2a7de",
    padding: 15,
    marginBottom: 12,
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#333",
    textTransform: "capitalize",
  },

  body: {
    fontSize: 15,
    color: "#555",
    lineHeight: 22,
  },
  search:{
    
          borderWidth:1,
          bordercolor:"#D1D5D8",
          padding:12,
          borderRadius:10,
          marginBottom:15,
          backgroundColor:"#ffff"
  },
});