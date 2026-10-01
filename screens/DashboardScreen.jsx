import { View, Text, StyleSheet, FlatList,TextInput, Switch} from "react-native";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import { useState, useEffect} from "react";
import fraisData from "../data/frais.json";
import FraisCard from "../components/FraisCard";

export default function DashboardScreen() {
  const { user } = useAuth();
  const [fraisList, setFraisList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterNonNull, setFilterNonNull]= useState(true);
  const [minAmount, setMinAmount] = useState("";)
  useEffect(() => {
    setTimeout(() => {
      setFraisList(fraisData);
      setLoading(false);
     }, 500);
  }, []);
  
  const filterdFrais = fraisList
  .filter((frais)=> !filterNonNull || frais.montantvalide !== null)
  .filter((frais)=>
    frais.anneemois.includes(searchTerm) || 
    frais.id_visiteur.toString().includes(searchTerm)
  )
   .filter((frais) =>
       minAmount === "" || frais.montantvalide >= Number(minAmount)
  )

    
  if (loading) {
    return <ActivityIndicator size="large" style={{marginTop: 40}}/>;
  }

  return (
    <View style={styles.screen}>
       <Navbar />

          <View style={styles.content}>
            <Text>Bienvenue {user}</Text>

            <TextInput 
            placeholer="Rechercher par année-mois ou ID visiteur..."
            value={searchTerm}
            onChangeText={setSearchTerm}
            style={styles.searchInput}
            />

            <Switch 
              value = {filterNonNull}
              onValueChange={setFilterNonNull}
            />

            <Text>Afficher seulement les frais avec un montant validé </Text>

              <TextInput
              placeholer="Montant minimum..."
              value={mineAmount}
              onChangeText={setMinAmount}
              keyboardType="numeric"
              style={styles.searchInput}
              />

            <FlatList
                data={filteredFrais}
                keyExtractor={(item) => item.id_frais.toString()}
                renderItem={({ item }) => <FraisCard frais={item} />}
            />
          </View>
      </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { padding: 16 },
});
