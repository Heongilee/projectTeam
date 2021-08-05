package com.projectTeam.therapist.postService;

import com.projectTeam.therapist.model.PostCategory;
import com.projectTeam.therapist.model.PostDto;
import com.projectTeam.therapist.model.UserDto;
import com.projectTeam.therapist.repository.PostRepository;
import com.projectTeam.therapist.repository.ReplyRepository;
import com.projectTeam.therapist.repository.UserRepository;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ReplyRepository replyRepository;

    public PostDto save(String userName, PostDto postDto) {
        UserDto user = userRepository.findByUserName(userName);
        postDto.setUserDto(user);
        return postRepository.save(postDto);
    }

    public JSONObject findByPostType(PostCategory postType, final Pageable pageable) {
        Page<PostDto> postPages = postRepository.findByPostType(postType, pageable);

        // 검색된 카테고리 게시글 개수
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("postType", postType);
        jsonObject.put("totalAmount", postPages.getTotalElements());
        jsonObject.put("totalPages", postPages.getTotalPages());

        // postType 파라미터와 일치하는 모든 게시글들을 JSONArray로 담는다.
        JSONArray postsArray = new JSONArray();
        for (PostDto post : postPages.getContent()) {
            JSONObject item = new JSONObject();
            item.put("postId", post.getPostId());
            item.put("userId", post.getUserDto().getUserId());
            item.put("postType", post.getPostType().toString()); // Enum 타입이기 때문에 문자열 처리를 위한 .toString() 을 붙여준다.
            item.put("postTitle", post.getPostTitle());
            item.put("postContent", post.getPostContent());
            item.put("postComments", post.getPostComments());
            item.put("replyLength", replyRepository.countByPostId(post.getPostId()));
            postsArray.add(item);
        }
        jsonObject.put("posts", postsArray);
        return jsonObject;
    }

    public PostDto save(PostDto newPost) {
        return postRepository.save(newPost);
    }

    public PostDto findSingleItem(Long postId) {
        return postRepository.findById(postId).orElse(null);
    }

    public PostDto modifyById(PostDto newPost, Long id) {
        return postRepository.findById(id)
                .map(postDto -> {
                    postDto.setPostType(newPost.getPostType());
                    postDto.setPostTitle(newPost.getPostTitle());
                    postDto.setPostContent(newPost.getPostContent());
                    return postRepository.save(postDto);
                })
                .orElseGet(() -> {
                    newPost.setPostId(id);
                    return postRepository.save(newPost);
                });
    }

    public void deleteById(Long postId) {
        postRepository.deleteById(postId);
    }
}
