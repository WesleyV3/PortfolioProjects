using UnityEngine;

public class PlayerMovement : MonoBehaviour
{
    private Vector3 m_Direction;
    private float m_Strength = 6.5f;
    private float m_Gravity = -15.0f;
    private float m_Ceiling = 5.0f;
    // Start is called before the first frame update
    void Start()
    {
        gameObject.GetComponent<AudioSource>().volume = GameManager.Instance.gameSettings.AudioSettings.GameSFX;
    }

    // Update is called once per frame
    void Update()
    {
        if (GameManager.Instance.gameSettings.IsGamePlaying)
        {
            MovePlayer();
        }
    }

    public void MovePlayer()
    {
        if (Input.touchCount > 0)
        {
            Touch touch = Input.GetTouch(0);
            if (touch.phase == TouchPhase.Began)
            {
                GetComponent<AudioSource>().Play();
                if (gameObject.transform.position.y < m_Ceiling)
                {
                    m_Direction = Vector3.up * m_Strength;
                }
            }
        }
        m_Direction.y += m_Gravity * Time.deltaTime;
        transform.position += m_Direction * Time.deltaTime;
    }
}
