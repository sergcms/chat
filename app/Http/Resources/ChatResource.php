<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
// use Illuminate\Support\Collection;

// class ChatResource extends ResourceCollection
class ChatResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        // return parent::toArray($request);
        return [
            'type'         => 'chat',
            'id'           => (string)$this->id,
            'from_user_id' => (string)$this->from_user_id,
            'to_user_id'   => (string)$this->to_user_id,
            'message'      => $this->message,
        ];
    }

    // public function toArray($request)
    // {
    //     return [
    //         'data' => ChatResource ::collection($this->collection),
    //     ];
    // }
    // public function with($request)
    // {
    //     return [
    //         'links'    => [
    //             'self' => route('articles.index'),
    //         ],
    //     ];
    // }
}
