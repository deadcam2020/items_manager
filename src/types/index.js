class NavLink {
  constructor(imgURL, route, label) {
    this.imgURL = imgURL;
    this.route = route;
    this.label = label;
  }
}

class UpdateUser {
  constructor(userId, name, bio, imageId, imageUrl, file) {
    this.userId = userId;
    this.name = name;
    this.bio = bio;
    this.imageId = imageId;
    this.imageUrl = imageUrl;
    this.file = file;
  }
}

class NewPost {
  constructor(userId, caption, file, location = '', tags = '') {
    this.userId = userId;
    this.caption = caption;
    this.file = file;
    this.location = location;
    this.tags = tags;
  }
}

class UpdatePost {
  constructor(postId, caption, imageId, imageUrl, file, location = '', tags = '') {
    this.postId = postId;
    this.caption = caption;
    this.imageId = imageId;
    this.imageUrl = imageUrl;
    this.file = file;
    this.location = location;
    this.tags = tags;
  }
}

class User {
  constructor(id, name, username, email, imageUrl, bio) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.email = email;
    this.imageUrl = imageUrl;
    this.bio = bio;
  }
}

class NewUser {
  constructor(name, email, username, password) {
    this.name = name;
    this.email = email;
   
    this.password = password;
  }
}
