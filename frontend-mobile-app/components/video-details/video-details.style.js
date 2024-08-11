import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  video: {
    alignSelf: 'stretch',
    marginVertical: 10,
  },
  detailsContainer: {
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  confidenceScore: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#4CAF50', 
    marginLeft: -25,
    marginTop: 60
    // Green for confidence level
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginVertical: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '400',
    color: '#555',
  },
  metaDataContainer: {
    marginTop: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: '#e9ecef',
    borderRadius: 6,
  },
  metaHeader: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },
  shareButton: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#2D1461',
    borderRadius: 8,
    alignItems: 'center',
  },
  shareButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
});
