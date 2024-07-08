using UnityEngine;

public class SpawnManager : MonoBehaviour
{
    [SerializeField] private float m_Speed;
    [SerializeField] private GameObject[] m_ObstaclePrefabs;
    private float m_LastYPos = 5.0f;
    private readonly int m_MaxHeightDifference = 2;
    private readonly int m_InitialStartTime = 3;

    // Start is called before the first frame update
    void Start()
    {
        Invoke(nameof(SpawnObstacle), m_InitialStartTime);
        GameManager.Instance.gameSettings.IsGamePlaying = true;
    }

    private void Update()
    {
        if(GameManager.Instance.gameSettings.PlayerSettings.AdCounter >= 5)
        {
            GameObject.Find("Game Manager").GetComponent<AdsInitializer>().ShowFullAdd();
            GameManager.Instance.gameSettings.PlayerSettings.ResetAdCounter();
        }
    }

    //Creates a random prefab at a random time
    public void SpawnObstacle()
    {
        if (GameManager.Instance.gameSettings.IsGamePlaying)
        {
            Vector3 position = new Vector3(5, -GetRandom(m_MaxHeightDifference), 0);
            GameObject randomPrefab = m_ObstaclePrefabs[Random.Range(0, m_ObstaclePrefabs.Length)];
            Instantiate(randomPrefab, position, randomPrefab.transform.rotation);
        }
        Invoke(nameof(SpawnObstacle), Random.Range(1f, 1.5f));
    }

    //Obtains a random Y position in between the bounds
    public float GetRandom(float maxDifference)
    {
        float random = Random.Range(100, 700) / 100;
        float maxY = m_LastYPos + maxDifference;
        float minY = m_LastYPos - maxDifference;
        if(random < minY || random > maxY)
        {
            return GetRandom(maxDifference);
        }
        m_LastYPos = random;
        return random;
    }
}
