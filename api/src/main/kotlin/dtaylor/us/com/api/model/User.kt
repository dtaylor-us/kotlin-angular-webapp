package dtaylor.us.com.api.model

import org.bson.types.ObjectId
import org.springframework.data.annotation.Id

data class User(
     @Id
     var id: String? = ObjectId().toHexString(),
     val firstName: String,
     val lastName: String,
     val emailId: String,

 )
