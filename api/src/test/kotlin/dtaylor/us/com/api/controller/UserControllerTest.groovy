package dtaylor.us.com.api.controller


import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import spock.lang.Specification

@SpringBootTest
class UserControllerTest extends Specification {

    @Autowired(required = false)
    private UserController webController

    def "when context is loaded then all expected beans are created"() {
        expect: "the WebController is created"
        webController
    }

}
