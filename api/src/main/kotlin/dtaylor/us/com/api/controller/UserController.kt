package dtaylor.us.com.api.controller

import dtaylor.us.com.api.model.User
import dtaylor.us.com.api.service.UserService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@CrossOrigin(origins = ["http://localhost:4200"])
class UserController(private val userService: UserService) {

    @GetMapping("/users")
    fun getAllUsers(): List<User> = userService.findAll()

    @PostMapping("/users")
    fun createUser(@RequestBody user: User): User = userService.save(user)

    @GetMapping("users/{id}")
    fun getByById(@PathVariable(value = "id") userId: String): ResponseEntity<User> {
        return userService.findById(userId).map { u ->
            ResponseEntity.ok(u)
        }.orElse(ResponseEntity.notFound().build())
    }

    @PutMapping("users/{id}")
    fun updateById(
        @PathVariable(value = "id") userId: String,
        @RequestBody newUser: User
    ): ResponseEntity<User> {
        return userService.update(newUser, userId).map {
            ResponseEntity.ok().body(it)
        }.orElse(ResponseEntity.notFound().build())
    }

    @DeleteMapping("users/{id}")
    fun deleteById(@PathVariable(value = "id") userId: String): ResponseEntity<Void> {
        return userService.delete(userId).map {
            ResponseEntity<Void>(HttpStatus.OK)
        }.orElse(ResponseEntity.notFound().build())
    }
}
