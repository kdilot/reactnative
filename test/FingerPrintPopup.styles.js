export default {
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 164, 222, 0.9)',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    height: '50%',
    backgroundColor: '#ffffff',
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 5,
  },
  message: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 3,
  },
  description: error => ({
    textAlign: 'center',
    color: error ? '#ea3d13' : '#a5a5a5',
    fontSize: 18,
    marginHorizontal: 20,
  }),
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  buttonText: {
    color: '#8fbc5a',
    fontSize: 15,
    fontWeight: 'bold',
  },
};
