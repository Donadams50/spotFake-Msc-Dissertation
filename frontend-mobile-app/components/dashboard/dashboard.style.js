import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFBFF',
    padding: 20,
  },
  summarycontainer: {
    flexDirection: "row",
    marginBottom: 20
  },
  recentActivities: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  recentActivitiesLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222222',
  },
  seeAll: {
    fontSize: 14,
    color: '#888',
  },
  deepfakeCard: { 
    flex: 1,
    backgroundColor: '#F2711E', 
    borderRadius: 10,
    paddingTop: 30,
    paddingBottom: 30,
    elevation: 3, 
    shadowColor: '#000', 
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    alignItems: 'center'
  },
  
  genuineCard: {
    marginLeft: 10, 
    flex: 1,
    backgroundColor: '#2D1461',
    borderRadius: 10,
    paddingTop: 30,
    paddingBottom: 30,
    elevation: 3, 
    shadowColor: '#000', 
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    alignItems: 'center'
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#ffffff'
  },
  cardValue: {
    fontSize: 18,
    color: '#ffffff',
    marginBottom: 15,
  },
  activityBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF0E1',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  fileName: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#222222',
  },
});

export default styles;
