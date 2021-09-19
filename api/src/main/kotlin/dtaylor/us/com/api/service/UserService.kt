package dtaylor.us.com.api.service

import dtaylor.us.com.api.model.User
import dtaylor.us.com.api.repository.UserRepository
import org.springframework.stereotype.Service
import java.util.*

@Service
class UserService(private val userRepository: UserRepository) {

    fun findAll(): List<User> = userRepository.findAll()
    fun save(user: User): User = userRepository.save(user)
    fun findById(userId: String): Optional<User> = userRepository.findById(userId)

    fun update(newUser: User, userId: String): Optional<User> {
        return findById(userId).map { existingUser ->
            val updatedUser: User = existingUser.copy(
                firstName = newUser.firstName,
                lastName = newUser.lastName,
                emailId = newUser.emailId
            )
            save(updatedUser)
        }
    }

    fun delete(userId: String): Optional<User> {
        return findById(userId).map {
            userRepository.delete(it)
            it
        }
    }

}
