import org.junit.api.Test;
import static org.junit.api.Assertions.*;

public class UserServiceTest {

    private final UserService userService = new UserService();

    @Test
    public void testContrasenaNula() {
        assertFalse(userService.esContrasenaValida(null));
    }

    @Test
    public void testContrasenaVacia() {
        assertFalse(userService.esContrasenaValida(""));
    }

    @Test
    public void testContrasenaCorta() {
        assertFalse(userService.esContrasenaValida("12345"));
    }

    @Test
    public void testContrasenaValida() {
        assertTrue(userService.esContrasenaValida("abc123"));
    }
}
